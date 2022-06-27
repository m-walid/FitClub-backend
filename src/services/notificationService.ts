import NotificationRepository from '@/repositories/notificationRepository';
import AccountService from './accountService';
const firebaseApiKey = process.env.FIREBASE_API_KEY;
import * as admin from 'firebase-admin';
import '@firebase/messaging';
import { logger } from '@/utils/logger';

const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(firebaseApiKey)),
});
export default class NotificationService {
  static sendNotification = async (notificationBody) => {
    const { fcmToken } = await AccountService.getAccountById(notificationBody.accountId);
    admin
      .messaging(app)
      .send({
        notification: {
          title: notificationBody.title,
          body: notificationBody.body,
        },
        token: fcmToken,
      })
      .then(() => NotificationRepository.addNotification(notificationBody).catch((err) => logger.error(err)))
      .catch((err) => logger.error(err));
  };
  static getNotificationsByAccountId = async (accountId: string) => await NotificationRepository.getNotificationsByAccountId(accountId);
  static sendNewRequestNotification = async (accountId: string) => {
    const notificationBody = {
      accountId,
      title: 'New Request',
      body: 'You have a new request',
    };
    await NotificationService.sendNotification(notificationBody);
  };
  static sendRequestAcceptedNotification = async (accountId: string) => {
    const notificationBody = {
      accountId,
      title: 'Request Accepted',
      body: 'Your request has been accepted',
    };
    await NotificationService.sendNotification(notificationBody);
  };
  static sendRequestRejectedNotification = async (accountId: string) => {
    const notificationBody = {
      accountId,
      title: 'Request Rejected',
      body: 'Your request has been rejected',
    };
    await NotificationService.sendNotification(notificationBody);
  };
  static sendRequestDoneNotification = async (accountId: string) => {
    const notificationBody = {
      accountId,
      title: 'Request Done',
      body: 'Your customized program is ready !',
    };
    await NotificationService.sendNotification(notificationBody);
  };
  static newPurchaseNotification = async (accountId: string, billDetails: { traineeName: string; programTitle: string; price: any }) => {
    const notificationBody = {
      accountId,
      title: 'New payment',
      body: `${billDetails.traineeName} has paid ${billDetails.price} for ${billDetails.programTitle}`,
    };
    await NotificationService.sendNotification(notificationBody);
  };
}
