import { Router } from 'express';
import auth from '@/middlewares/auth';
import ChatController from '@/controllers/chatController';

const chatRouter = Router();
chatRouter.use(auth);
chatRouter.get('/', [ChatController.getChats]);

export default chatRouter;
