import { prisma } from '@config';
import Exception from '@exceptions/Exception';
import { Role } from '@prisma/client';

export default class CoachProfileRepository {
  static addProfile = async (profileDto) => {
    const profile = await prisma.coachProfile.create({
      data: profileDto,
    });
    return profile;
  };

  static getProfile = async (id) => {
    const profile = await prisma.coachProfile.findUnique({
      where: {
        accountId: id,
      },
      include: {
        account: true,
      },
    });
    if (!profile) throw new Exception("Couldn't find profile", 400);
    profile.account.password = null;
    return profile;
  };

  static updateProfile = async (editBody) => {
    const profile = await prisma.coachProfile.update({
      where: {
        accountId: editBody.accountId,
      },
      data: editBody,
      include: {
        account: true,
      },
    });
    if (!profile) throw new Exception("Couldn't find profile", 400);
    profile.account.password = null;
    return profile;
  };
  static topRatedCoaches = async () => {
    const coaches = await prisma.account.findMany({
      where: {
        role: Role.COACH,
      },
      orderBy: {
        averageRate: 'desc',
      },
      take: 10,
    });
    return coaches;
  };
  static searchCoaches = async (query) => {
    query = `%${query}%`;
    const coaches = await prisma.$queryRaw`
    select a.id, a."firstName", a."lastName",a."imgUrl",a."averageRate"
    from "Account" a 
    where lower(concat(a."firstName",' ', a."lastName")) like lower(${query})
    and a."role" = ${Role.COACH}
    order by a."averageRate" desc;
    `;
    return coaches;
  };

  static updateCoachCounts = async (id) => {
    const counts = await prisma.coachReviews.aggregate({
      where: {
        coachId: id,
      },
      _avg: {
        rating: true,
      },
    });
    const avg = Math.round(counts._avg.rating);
    await prisma.account.update({
      where: {
        id,
      },
      data: {
        averageRate: avg,
      },
    });
  };
}
