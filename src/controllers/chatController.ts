import { RequestWithAccount } from '@/interfaces/authInterface';
import ChatService from '@/services/chatService';
import formatResponse from '@/utils/formatResponse';
import asyncHandler from 'express-async-handler';
export default class ChatController {
  static getChats = asyncHandler(async (req: RequestWithAccount, res) => {
    const chats = await ChatService.getChats(req.account.id);
    res.send(formatResponse(chats));
  });
}
