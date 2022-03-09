import coachProfileRepository from '@/repositories/coachProfileRepository';

export default class CoachProfileService {
  static addCoach = async (addBody) => {
    const profile = await coachProfileRepository.addProfile(addBody);
    return profile;
  };
  static getCoach = async (getBody) => {
    const profile = await coachProfileRepository.getProfile(getBody.accountId);
    return profile;
  };
  static updateCoach = async (editBody) => {
    const profile = await coachProfileRepository.updateProfile(editBody);
    return profile;
  };
}
