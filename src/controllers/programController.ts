import CreateProgramReview from '@/dtos/createProgramReview';
import ProgramDto from '@/dtos/programDto';
import UpdateProgramReview from '@/dtos/updateProgramReview';
import validateDto from '@/dtos/validate';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import ProgramRequestService from '@/services/programRequestService';
import ProgramReviewService from '@/services/programReviewService';
import ProgramService from '@/services/programService';
import { ProgramRequestStatus } from '@prisma/client';
import formatResponse from '@utils/formatResponse';
import asyncHandler from 'express-async-handler';

export default class ProgramController {
  static postProgram = asyncHandler(async (req: RequestWithAccount, res) => {
    const programDto: ProgramDto = req.body;
    await validateDto(ProgramDto, programDto);
    const coachId = req.account.id;
    const createdProgram = await ProgramService.addProgram(programDto, coachId);
    res.send(formatResponse(createdProgram));
  });

  static postProgramWithRequest = asyncHandler(async (req: RequestWithAccount, res) => {
    const programDto: ProgramDto = req.body;
    await validateDto(ProgramDto, programDto);
    const programRequestId = req.params.requestId;
    const coachId = req.account.id;
    const createdProgram = await ProgramService.addProgram(programDto, coachId);
    await ProgramRequestService.updateProgramRequestStatus(programRequestId, ProgramRequestStatus.Done);
    res.send(formatResponse(createdProgram));
  });
  static getProgram = asyncHandler(async (req, res) => {
    const programId = req.params.id;
    // TODO: VALIDATION IF SUBSCRIBED USER OR OWNER OF PROGRAM
    const program = await ProgramService.getProgram(programId);
    res.send(formatResponse(program));
  });
  static getProgramDayExercises = asyncHandler(async (req, res) => {
    const dayId = req.params.dayId;
    // TODO: VALIDATION IF SUBSCRIBED USER OR OWNER OF PROGRAM
    const program = await ProgramService.getProgramDayExercises(dayId);
    res.send(formatResponse(program));
  });
  static updateProgram = asyncHandler(async (req: RequestWithAccount, res) => {
    const programId = req.params.id;
    const program = await ProgramService.getProgram(programId);
    if (program.coachId !== req.account.id) throw new UnauthorizedException();
    const programDto: ProgramDto = req.body;
    await validateDto(ProgramDto, programDto);
    const updatedProgram = await ProgramService.updateProgram(programDto, programId);
    res.send(formatResponse(updatedProgram));
  });
  static deleteProgram = asyncHandler(async (req: RequestWithAccount, res) => {
    const programId = req.params.id;
    const program = await ProgramService.getProgram(programId);
    if (program.coachId !== req.account.id) throw new UnauthorizedException();
    const deletedProgram = await ProgramService.deleteProgram(programId);
    res.send(formatResponse(deletedProgram));
  });
  static getReviews = asyncHandler(async (req, res) => {
    const accountId = req.params.id;
    const profile = await ProgramReviewService.getReviews(accountId);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static postReview = asyncHandler(async (req: RequestWithAccount, res) => {
    const programReviewDto: CreateProgramReview = req.body;
    await validateDto(CreateProgramReview, programReviewDto);
    programReviewDto.coachId = req.params.id;
    programReviewDto.userId = req.account.id;
    const createdReview = await ProgramReviewService.addReview(programReviewDto);
    res.send(formatResponse(createdReview));
  });
  static updateReview = asyncHandler(async (req: RequestWithAccount, res) => {
    const reviewId = req.params.id;
    const review = await ProgramReviewService.getReview(reviewId);
    if (review.userId !== req.account.id) throw new UnauthorizedException();
    const reviewDto: UpdateProgramReview = req.body;
    await validateDto(UpdateProgramReview, reviewDto);
    const updatedReview = await ProgramReviewService.updateReview(reviewDto, reviewId);
    res.send(formatResponse(updatedReview));
  });
  static deleteReview = asyncHandler(async (req: RequestWithAccount, res) => {
    const reviewId = req.params.id;
    const review = await ProgramReviewService.getReview(reviewId);
    if (review.userId !== req.account.id) throw new UnauthorizedException();
    const deletedReview = await ProgramReviewService.deleteReview(reviewId);
    res.send(formatResponse(deletedReview));
  });
}
