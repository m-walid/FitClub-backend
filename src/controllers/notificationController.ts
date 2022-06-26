import { RequestWithAccount } from '@/interfaces/authInterface';
import NotificationService from '@/services/notificationService';
import asyncHandler from 'express-async-handler';

export default class NotificationController {
  static getNotifications = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.account.id;
    const notifications = await NotificationService.getNotificationsByAccountId(accountId);
    res.send(notifications);
  });
}
