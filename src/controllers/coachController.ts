import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import formatResponse from '@/utils/formatResponse';
import asyncHandler from 'express-async-handler';
import CoachDto from '@/dtos/coachDto';
import validateDto from '@/dtos/validate';
import CoachProfileService from '@/services/coachProfileService';
import CoachUpdateDto from '@/dtos/coachUpdateDto';
import CoachReviewService from '@/services/coachReviewService';
import CreateCoachReview from '@/dtos/createCoachReview';
import UpdateCoachReview from '@/dtos/updateCoachReview';
import ExerciseService from '@/services/exerciseService';

export default class CoachController {
  static addCoach = asyncHandler(async (req: RequestWithAccount, res) => {
    const coachDto: CoachDto = req.body;
    await validateDto(CoachDto, coachDto);
    coachDto.accountId = req.account.id;
    const profile = await CoachProfileService.addCoach(coachDto);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static getCoach = asyncHandler(async (req, res) => {
    const coachBody = {
      accountId: req.params.id,
    };
    const profile = await CoachProfileService.getCoach(coachBody);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static updateCoach = asyncHandler(async (req: RequestWithAccount, res) => {
    const coachUpdateDto: CoachUpdateDto = req.body;
    if (req.params.id !== req.account.id) throw new UnauthorizedException();
    await validateDto(CoachUpdateDto, coachUpdateDto);
    coachUpdateDto.accountId = req.account.id;
    const profile = await CoachProfileService.updateCoach(coachUpdateDto);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static getReviews = asyncHandler(async (req, res) => {
    const accountId = req.params.id;
    const profile = await CoachReviewService.getReviews(accountId);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static postReview = asyncHandler(async (req: RequestWithAccount, res) => {
    const coachReviewDto: CreateCoachReview = req.body;
    await validateDto(CreateCoachReview, coachReviewDto);
    coachReviewDto.coachId = req.params.id;
    coachReviewDto.userId = req.account.id;
    const createdReview = await CoachReviewService.addReview(coachReviewDto);
    res.send(formatResponse(createdReview));
  });
  static updateReview = asyncHandler(async (req: RequestWithAccount, res) => {
    const reviewId = req.params.id;
    const review = await CoachReviewService.getReview(reviewId);
    if (review.userId !== req.account.id) throw new UnauthorizedException();
    const reviewDto: UpdateCoachReview = req.body;
    await validateDto(UpdateCoachReview, reviewDto);
    const updatedReview = await CoachReviewService.updateReview(reviewDto, reviewId);
    res.send(formatResponse(updatedReview));
  });
  static deleteReview = asyncHandler(async (req: RequestWithAccount, res) => {
    const reviewId = req.params.id;
    const review = await CoachReviewService.getReview(reviewId);
    if (review.userId !== req.account.id) throw new UnauthorizedException();
    const deletedReview = await CoachReviewService.deleteReview(reviewId);
    res.send(formatResponse(deletedReview));
  });

  static getExercises = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.params.id;
    if (accountId !== req.account.id) throw new UnauthorizedException();
    const exercises = await ExerciseService.getExercises(req.account.id);
    res.send(formatResponse(exercises));
  });
}
