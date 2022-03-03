import profileRepository from '@repositories/profileRepository';

export default class TraineeProfileService {
  static addTrainee = async (addBody) => {
    const profile = await profileRepository.addProfile(addBody);
    return profile;
  };
  static getTrainee = async (getBody) => {
    const profile = await profileRepository.getProfile(getBody.accountId);
    return profile;
  };
  static updateTrainee = async (editBody) => {
    const profile = await profileRepository.updateProfile(editBody);
    return profile;
  };
}
