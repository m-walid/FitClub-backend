import traineeProfileService from '@services/traineeProfileService';
import asyncHandler from 'express-async-handler';
import formatResponse from '@utils/formatResponse';
import { RequestWithAccount } from '@/interfaces/authInterface';
import TraineeDto from '@/dtos/traineeDto';
import validateDto from '@/dtos/validate';
import TraineeUpdateDto from '@/dtos/traineeUpdateDto';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import ProgramService from '@/services/programService';

export default class TraineeController {
  static addTrainee = asyncHandler(async (req: RequestWithAccount, res) => {
    const traineeDto: TraineeDto = req.body;
    await validateDto(TraineeDto, traineeDto);
    traineeDto.accountId = req.account.id;
    const profile = await traineeProfileService.addTrainee(traineeDto);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static getTrainee = asyncHandler(async (req, res) => {
    const traineeBody = {
      accountId: req.params.id,
    };
    const profile = await traineeProfileService.getTrainee(traineeBody);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });
  static updateTrainee = asyncHandler(async (req: RequestWithAccount, res) => {
    const traineeUpdateDto: TraineeUpdateDto = req.body;
    if (req.params.id !== req.account.id) throw new UnauthorizedException();
    await validateDto(TraineeUpdateDto, traineeUpdateDto);
    traineeUpdateDto.accountId = req.account.id;
    const profile = await traineeProfileService.updateTrainee(traineeUpdateDto);
    const profileResponse = formatResponse(profile);
    res.send(profileResponse);
  });

  static getTraineePrograms = asyncHandler(async (req: RequestWithAccount, res) => {
    const traineeId = req.account.id;
    const programs = await ProgramService.getProgramsForTrainee(traineeId);
    const programsResponse = formatResponse(programs);
    res.send(programsResponse);
  });
}
