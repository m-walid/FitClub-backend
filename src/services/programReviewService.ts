import CreateProgramReview from '@/dtos/createProgramReview';
import UpdateProgramReview from '@/dtos/updateProgramReview';
import programReviewRepository from '@/repositories/programReviewRepository';

export default class ProgramReviewService {
  static addReview = async (reviewDto: CreateProgramReview) => {
    return await programReviewRepository.addReviewByProgramId(reviewDto);
  };
  static getReview = async (reviewId: string) => {
    return await programReviewRepository.getReveiwById(reviewId);
  };
  static getReviews = async (programId: string) => {
    return await programReviewRepository.getReviewsByProgramId(programId);
  };
  static updateReview = async (reviewDto: UpdateProgramReview, reviewId: string) => {
    return await programReviewRepository.updateReviewById(reviewDto, reviewId);
  };
  static deleteReview = async (reviewId: string) => {
    return await programReviewRepository.deleteReviewById(reviewId);
  };
}
