import { Router } from 'express';
import auth from '@middlewares/auth';
import NotificationController from '@/controllers/notificationController';

const notificationRouter = Router();
notificationRouter.use(auth);
notificationRouter.route('/').get(NotificationController.getNotifications);

export default notificationRouter;
