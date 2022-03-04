import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import ExerciseService from '@/services/exerciseService';
import formatResponse from '@/utils/formatResponse';
import asyncHandler from 'express-async-handler';
export default class CoachController {
  static getExercises = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.params.id;
    if (accountId !== req.account.id) throw new UnauthorizedException();
    const exercises = await ExerciseService.getExercises(req.account.id);
    res.send(formatResponse(exercises));
  });
}
