import CoachProfileService from './coachProfileService';
import ProgramService from './programService';

export default class DiscoveryService {
  static getDiscoveryPage = async () => {
    const [topRatedCoaches, programs] = await Promise.all([CoachProfileService.getTopRatedCoaches(), ProgramService.getDiscoveryPrograms()]);
    return { coaches: { topRatedCoaches }, programs };
  };

  static search = async (query) => {
    const [coaches, programs] = await Promise.all([CoachProfileService.searchCoaches(query), ProgramService.searchPrograms(query)]);
    return { coaches, programs };
  };
}
