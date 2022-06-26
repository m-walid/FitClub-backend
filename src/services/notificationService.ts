import NotificationRepository from '@/repositories/notificationRepository';
import fetch from 'node-fetch';
import AccountService from './accountService';
const firebaseApiKey = process.env.FIREBASE_API_KEY;
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const url = `https://fcm.googleapis.com/v1/projects/${firebaseProjectId}/messages:send`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${firebaseApiKey}`,
};
export default class NotificationService {
  static sendNotification = async (notificationBody) => {
    const { fcmToken } = await AccountService.getAccountById(notificationBody.accountId);
    await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: {
          notification: {
            title: notificationBody.title,
            body: notificationBody.body,
          },
          token: fcmToken,
        },
      }),
    });
    await NotificationRepository.addNotification(notificationBody);
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
