const { profileRepository } = require("../repositories/profileRepository");

const addTrainee = async (addBody) => {
  const profile = await profileRepository.addProfile(addBody);
  return profile;
};
const getTrainee = async (getBody) => {
  const profile = await profileRepository.getProfile(getBody.accountId);
  return profile;
};
const updateTrainee = async (editBody) => {
  const profile = await profileRepository.updateProfile(editBody);
  return profile;
};

const traineeProfileService = {
  addTrainee,
  getTrainee,
  updateTrainee,
};

module.exports = { traineeProfileService };
