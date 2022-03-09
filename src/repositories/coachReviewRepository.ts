import { prisma } from '@/config/config';
import CreateCoachReview from '@/dtos/createCoachReview';
import UpdateCoachReview from '@/dtos/updateCoachReview';
import Exception from '@/exceptions/Exception';

export default class coachReviewRepository {
  static addReviewByAccountId = async (reviewDto: CreateCoachReview) => {
    const review = prisma.coachReviews.create({
      data: reviewDto,
    });
    return review;
  };
  static getReveiwById = async (reviewId: string) => {
    const review = await prisma.coachReviews.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review) throw new Exception('Exercise not found');
    return review;
  };
  static getReviewsByAccountId = async (accountId: string) => {
    const reviews = await prisma.coachReviews.findMany({
      where: {
        coachId: accountId,
      },
    });
    return reviews;
  };
  static updateReviewById = async (reviewDto: UpdateCoachReview, reviewId: string) => {
    const updatedReview = await prisma.coachReviews.update({
      where: {
        id: reviewId,
      },
      data: reviewDto,
    });
    return updatedReview;
  };
  static deleteReviewById = async (reviewId: string) => {
    const deletedReview = await prisma.coachReviews.delete({
      where: {
        id: reviewId,
      },
    });
    return deletedReview;
  };
}
