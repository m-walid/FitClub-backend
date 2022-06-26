import CreateProgramReview from '@/dtos/createProgramReview';
import ProgramDto from '@/dtos/programDto';
import ProgramUpdateDto from '@/dtos/programUpdateDto';
import UpdateProgramReview from '@/dtos/updateProgramReview';
import validateDto from '@/dtos/validate';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import NotificationService from '@/services/notificationService';
import ProgramRequestService from '@/services/programRequestService';
import ProgramReviewService from '@/services/programReviewService';
import ProgramService from '@/services/programService';
import { Role } from '@/utils/enums/role.enum';
import { ProgramRequestStatus, ProgramType } from '@prisma/client';
import formatResponse from '@utils/formatResponse';
import asyncHandler from 'express-async-handler';

export default class ProgramController {
  static hasAccessToProgram = asyncHandler(async (req: RequestWithAccount, res) => {
    const programId = req.params.programId;
    const userId = req.account.id;
    const hasAccess = await ProgramService.hasAccessToProgram(programId, userId);
    res.send(formatResponse({ hasAccess }));
  });
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
    const createdProgram = await ProgramService.addProgram(programDto, coachId, ProgramType.Custom);
    await ProgramRequestService.linkProgramToRequest(createdProgram.id, programRequestId);
    await ProgramRequestService.updateProgramRequestStatus(programRequestId, ProgramRequestStatus.Done);
    const traineeId = (await ProgramRequestService.getProgramRequestById(programRequestId)).traineeId;
    NotificationService.sendRequestDoneNotification(traineeId);
    res.send(formatResponse(createdProgram));
  });

  static getPrograms = asyncHandler(async (req: RequestWithAccount, res) => {
    const role = req.account.role;
    const accountId = req.account.id;
    switch (role) {
      case Role.COACH:
        const programsForCoach = await ProgramService.getProgramsForCoach(accountId);
        res.send(formatResponse(programsForCoach));
        break;
      case Role.TRAINEE:
        const programsForTrainee = await ProgramService.getProgramsForTrainee(accountId);
        res.send(formatResponse(programsForTrainee));
        break;
      default:
        throw new UnauthorizedException();
    }
  });
  static getProgram = asyncHandler(async (req: RequestWithAccount, res) => {
    const programId = req.params.id;
    const role = req.account.role;
    switch (role) {
      case Role.COACH:
        const program = await ProgramService.getProgram(programId);
        if (program.coachId !== req.account.id) throw new UnauthorizedException();
        res.send(formatResponse(program));
        break;
      case Role.TRAINEE:
        const traineeId = req.account.id;
        const programForTrainee = await ProgramService.getProgramForTrainee(programId, traineeId);
        res.send(formatResponse(programForTrainee));
        break;
      default:
        throw new UnauthorizedException();
    }
  });
  static getProgramDayExercises = asyncHandler(async (req, res) => {
    const dayId = req.params.dayId;
    // TODO: VALIDATION IF SUBSCRIBED USER OR OWNER OF PROGRAM
    const dayExercises = await ProgramService.getProgramDayExercises(dayId);
    res.send(formatResponse(dayExercises));
  });
  static updateProgram = asyncHandler(async (req: RequestWithAccount, res) => {
    const programId = req.params.id;
    const program = await ProgramService.getProgram(programId);
    if (program.coachId !== req.account.id) throw new UnauthorizedException();
    const programDto: ProgramUpdateDto = req.body;
    await validateDto(ProgramUpdateDto, programDto);
    const updatedProgram = await ProgramService.updateProgram(programDto, programId);
    res.send(formatResponse(updatedProgram));
  });

  static getReviews = asyncHandler(async (req, res) => {
    const programId = req.params.id;
    const profile = await ProgramReviewService.getReviews(programId);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static postReview = asyncHandler(async (req: RequestWithAccount, res) => {
    const programReviewDto: CreateProgramReview = req.body;
    await validateDto(CreateProgramReview, programReviewDto);
    programReviewDto.programId = req.params.id;
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
