import { prisma } from '@/config/config';
import CreateProgramReview from '@/dtos/createProgramReview';
import UpdateProgramReview from '@/dtos/updateProgramReview';
import Exception from '@/exceptions/Exception';

export default class programReviewRepository {
  static addReviewByProgramId = async (reviewDto: CreateProgramReview) => {
    const review = await prisma.programReview.create({
      data: reviewDto,
    });
    return review;
  };
  static getReveiwById = async (reviewId: string) => {
    const review = await prisma.programReview.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        reviewAuthor: {
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
  static getReviewsByProgramId = async (programId: string) => {
    const reviews = await prisma.programReview.findMany({
      where: {
        programId: programId,
      },
      include: {
        reviewAuthor: {
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
  static updateReviewById = async (reviewDto: UpdateProgramReview, reviewId: string) => {
    const updatedReview = await prisma.programReview.update({
      where: {
        id: reviewId,
      },
      data: reviewDto,
    });
    return updatedReview;
  };
  static deleteReviewById = async (reviewId: string) => {
    const deletedReview = await prisma.programReview.delete({
      where: {
        id: reviewId,
      },
    });
    return deletedReview;
  };
}
