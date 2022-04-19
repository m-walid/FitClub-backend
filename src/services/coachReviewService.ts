import CreateCoachReview from '@/dtos/createCoachReview';
import UpdateCoachReview from '@/dtos/updateCoachReview';
import coachReviewRepository from '@/repositories/coachReviewRepository';

export default class CoachReviewService {
  static addReview = async (reviewDto: CreateCoachReview) => {
    return await coachReviewRepository.addReviewByAccountId(reviewDto);
  };
  static getReview = async (reviewId: string) => {
    return await coachReviewRepository.getReveiwById(reviewId);
  };
  static getReviews = async (accountId: string) => {
    return await coachReviewRepository.getReviewsByAccountId(accountId);
  };
  static updateReview = async (reviewDto: UpdateCoachReview, reviewId: string) => {
    return await coachReviewRepository.updateReviewById(reviewDto, reviewId);
  };
  static deleteReview = async (reviewId: string) => {
    return await coachReviewRepository.deleteReviewById(reviewId);
  };
}
