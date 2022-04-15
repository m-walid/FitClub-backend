import ProgramRequestDto from '@/dtos/programRequestDto';
import validateDto from '@/dtos/validate';
import Exception from '@/exceptions/Exception';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import ChatService from '@/services/chatService';
import ProgramRequestService from '@/services/programRequestService';
import { Role } from '@/utils/enums/role.enum';
import formatResponse from '@/utils/formatResponse';
import asyncHandler from 'express-async-handler';

export default class ProgramRequestController {
  static addRequest = asyncHandler(async (req: RequestWithAccount, res) => {
    const programRequestDto: ProgramRequestDto = req.body;
    await validateDto(ProgramRequestDto, programRequestDto);
    programRequestDto.traineeId = req.account.id;
    const createdProgramRequest = await ProgramRequestService.addProgramRequest(programRequestDto);
    await ChatService.addChat(programRequestDto.traineeId, programRequestDto.coachId);
    res.send(formatResponse(createdProgramRequest));
  });

  static getRequest = asyncHandler(async (req: RequestWithAccount, res) => {
    const programRequestId = req.params.id;
    const userId = req.account.id;
    const userRole = req.account.role;
    if (userRole === Role.TRAINEE) {
      const programRequest = await ProgramRequestService.getProgramRequestForTrainee(programRequestId);
      if (programRequest.traineeId !== userId) throw new UnauthorizedException();
      res.send(formatResponse(programRequest));
    } else if (userRole === Role.COACH) {
      const programRequest = await ProgramRequestService.getProgramRequestForCoach(programRequestId);
      if (programRequest.coachId !== userId) throw new UnauthorizedException();
      res.send(formatResponse(programRequest));
    } else throw new UnauthorizedException();
  });

  static getRequests = asyncHandler(async (req: RequestWithAccount, res) => {
    const userId = req.account.id;
    const userRole = req.account.role;
    if (userRole === Role.TRAINEE) {
      const programRequests = await ProgramRequestService.getProgramRequestsForTrainee(userId);
      res.send(formatResponse(programRequests));
    } else if (userRole === Role.COACH) {
      const programRequests = await ProgramRequestService.getProgramRequestsForCoach(userId);
      res.send(formatResponse(programRequests));
    } else throw new UnauthorizedException();
  });

  static updateRequest = asyncHandler(async (req: RequestWithAccount, res) => {
    const programRequestId = req.params.id;
    const status = req.params.status;
    let programRequest;
    switch (status) {
      case 'accepted':
        programRequest = await ProgramRequestService.acceptProgramRequest(programRequestId);
        res.send(formatResponse(programRequest));
        break;
      case 'rejected':
        programRequest = await ProgramRequestService.rejectProgramRequest(programRequestId);
        // TODO: remove Chat between coach and trainee
        res.send(formatResponse(programRequest));
        break;
      default:
        throw new Exception('Invalid status');
    }
  });
}
