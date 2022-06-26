import { prisma } from '@/config/config';
import { Notification } from '@prisma/client';

export default class NotificationRepository {
  static addNotification = async (notificationBody) => {
    const notification = await prisma.notification.create({
      data: notificationBody,
    });
    return notification;
  };
  static getNotificationsByAccountId = async (accountId: string) => {
    const notifications = await prisma.notification.findMany({
      where: {
        accountId: accountId,
      },
    });
    return notifications;
  };
}
