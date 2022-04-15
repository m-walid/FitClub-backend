import { prisma } from '@/config/config';

export default class ChatRepository {
  static getChatsByAccountId = async (accountId: string) => {
    const chats = await prisma.chatRoom.findMany({
      where: {
        OR: [
          {
            traineeId: accountId,
          },
          {
            coachId: accountId,
          },
        ],
      },
      include: {
        trainee: {
          select: {
            firstName: true,
            lastName: true,
            imgUrl: true,
          },
        },
        coach: {
          select: {
            firstName: true,
            lastName: true,
            imgUrl: true,
          },
        },
      },
    });
    return chats;
  };

  static addChat = async (traineeId: string, coachId: string) => {
    const chat = await prisma.chatRoom.findUnique({
      where: {
        coachId_traineeId: {
          coachId,
          traineeId,
        },
      },
    });
    if (chat) return chat;
    return await prisma.chatRoom.create({
      data: {
        trainee: {
          connect: { id: traineeId },
        },
        coach: {
          connect: { id: coachId },
        },
      },
    });
  };
}
