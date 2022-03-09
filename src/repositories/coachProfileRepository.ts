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
}
