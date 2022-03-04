import traineeProfileRepository from '@/repositories/traineeProfileRepository';

export default class TraineeProfileService {
  static addTrainee = async (addBody) => {
    const profile = await traineeProfileRepository.addProfile(addBody);
    return profile;
  };
  static getTrainee = async (getBody) => {
    const profile = await traineeProfileRepository.getProfile(getBody.accountId);
    return profile;
  };
  static updateTrainee = async (editBody) => {
    const profile = await traineeProfileRepository.updateProfile(editBody);
    return profile;
  };
}
