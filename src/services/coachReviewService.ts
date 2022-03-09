import CreateExerciseDto from '@/dtos/createExerciseDto';
import UpdateCoachReview from '@/dtos/updateCoachReview';
import UpdateExerciseDto from '@/dtos/updateExerciseDto';
import coachReviewRepository from '@/repositories/coachReviewRepository';
import ExerciseRepository from '@/repositories/exerciseRepository';

export default class CoachReviewService {
  static addReview = async (reviewDto: UpdateCoachReview) => {
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
  static deleteReview = async (exerciseId: string) => {
    return await coachReviewRepository.deleteReviewById(exerciseId);
  };
}
