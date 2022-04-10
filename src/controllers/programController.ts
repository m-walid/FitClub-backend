import ProgramDto from '@/dtos/programDto';
import validateDto from '@/dtos/validate';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import ProgramService from '@/services/programService';
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
}
