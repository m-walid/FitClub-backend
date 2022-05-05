import { prisma } from '@config';
import Exception from '@exceptions/Exception';

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
    const coaches = await prisma.$queryRaw`
    select a.id, a."firstName", a."lastName",a."imgUrl", avg(cr.rating) as avg_rating
    from "Account" a 
    join "CoachReviews" cr on cr."coachId"  = a.id  
    group by a.id
    order by avg_rating desc 
    limit 10;
    `;
    return coaches;
  };
  static searchCoaches = async (query) => {
    query = `%${query}%`;
    const coaches = await prisma.$queryRaw`
    select a.id, a."firstName", a."lastName",a."imgUrl", avg(cr.rating) as avg_rating
    from "Account" a 
    join "CoachReviews" cr on cr."coachId"  = a.id  
    where lower(concat(a."firstName",' ', a."lastName")) like lower(${query})
    group by a.id
    order by avg_rating desc;
    `;
    return coaches;
  };
}
