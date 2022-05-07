import coachProfileRepository from '@/repositories/coachProfileRepository';

export default class CoachProfileService {
  static addCoach = async (addBody) => {
    const profile = await coachProfileRepository.addProfile(addBody);
    return profile;
  };
  static getCoach = async (getBody) => {
    const profile = await coachProfileRepository.getProfile(getBody.accountId);
    const averageRate = profile.account.averageRate;
    delete profile.account.averageRate;
    const modifiedProfile = { ...profile, averageRate };
    return modifiedProfile;
  };
  static updateCoach = async (editBody) => {
    const profile = await coachProfileRepository.updateProfile(editBody);
    return profile;
  };
  static getTopRatedCoaches = async () => {
    const topRatedCoaches = await coachProfileRepository.topRatedCoaches();
    return topRatedCoaches;
  };

  static searchCoaches = async (query) => {
    const coaches = await coachProfileRepository.searchCoaches(query);
    return coaches;
  };
}
