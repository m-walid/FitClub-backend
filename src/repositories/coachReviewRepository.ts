import { prisma } from '@/config/config';
import CreateCoachReview from '@/dtos/createCoachReview';
import UpdateCoachReview from '@/dtos/updateCoachReview';
import Exception from '@/exceptions/Exception';
import CoachProfileRepository from './coachProfileRepository';

export default class coachReviewRepository {
  static addReviewByAccountId = async (reviewDto: CreateCoachReview) => {
    const review = await prisma.coachReviews.create({
      data: reviewDto,
    });
    await CoachProfileRepository.updateCoachCounts(reviewDto.coachId);
    return review;
  };
  static getReveiwById = async (reviewId: string) => {
    const review = await prisma.coachReviews.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            imgUrl: true,
          },
        },
      },
    });
    if (!review) throw new Exception('Review not found');
    return review;
  };
  static getReviewsByAccountId = async (accountId: string) => {
    const reviews = await prisma.coachReviews.findMany({
      where: {
        coachId: accountId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            imgUrl: true,
          },
        },
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
    await CoachProfileRepository.updateCoachCounts(updatedReview.coachId);

    return updatedReview;
  };
  static deleteReviewById = async (reviewId: string) => {
    const deletedReview = await prisma.coachReviews.delete({
      where: {
        id: reviewId,
      },
    });
    await CoachProfileRepository.updateCoachCounts(deletedReview.coachId);
    return deletedReview;
  };
}
