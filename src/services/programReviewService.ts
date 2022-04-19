import CreateProgramReview from '@/dtos/createProgramReview';
import UpdateProgramReview from '@/dtos/updateProgramReview';
import programReviewRepository from '@/repositories/programReviewRepository';

export default class ProgramReviewService {
  static addReview = async (reviewDto: CreateProgramReview) => {
    return await programReviewRepository.addReviewByAccountId(reviewDto);
  };
  static getReview = async (reviewId: string) => {
    return await programReviewRepository.getReveiwById(reviewId);
  };
  static getReviews = async (accountId: string) => {
    return await programReviewRepository.getReviewsByAccountId(accountId);
  };
  static updateReview = async (reviewDto: UpdateProgramReview, reviewId: string) => {
    return await programReviewRepository.updateReviewById(reviewDto, reviewId);
  };
  static deleteReview = async (reviewId: string) => {
    return await programReviewRepository.deleteReviewById(reviewId);
  };
}
