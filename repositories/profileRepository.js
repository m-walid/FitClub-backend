const { prisma } = require("../config");
const Exception = require("../exceptions/Exception");

const addProfile = async (profileDto) => {
  const profile = await prisma.traineeProfile.create({
    data: profileDto,
  });
  return profile;
};

const getProfile = async (id) => {
  const profile = await prisma.traineeProfile.findUnique({
    where: {
      accountId: id,
    },
    include: {
      account: true,
    },
  });
  if (!profile) throw new Exception("Couldn't find profile", 400);
  return profile;
};

const updateProfile = async (editBody) => {
  const profile = await prisma.traineeProfile.update({
    where: {
      accountId: editBody.accountId,
    },
    data : editBody,
  });
  if (!profile) throw new Exception("Couldn't find profile", 400);
  return profile;
};
const profileRepository = {
  addProfile,
  getProfile,
  updateProfile,
};
module.exports = { profileRepository };
