import ChatRepository from '@/repositories/chatRepository';

export default class ChatService {
  static getChats = async (accountId: string) => {
    return await ChatRepository.getChatsByAccountId(accountId);
  };

  static addChat = async (traineeId: string, coachId: string) => {
    return await ChatRepository.addChat(traineeId, coachId);
  };
}
