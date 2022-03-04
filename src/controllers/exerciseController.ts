import CreateExerciseDto from '@/dtos/createExerciseDto';
import UpdateExerciseDto from '@/dtos/updateExerciseDto';
import validateDto from '@/dtos/validate';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import ExerciseService from '@/services/exerciseService';
import formatResponse from '@/utils/formatResponse';
import asyncHandler from 'express-async-handler';

export default class ExerciseController {
  static postExercise = asyncHandler(async (req: RequestWithAccount, res) => {
    const exerciseDto: CreateExerciseDto = req.body;
    await validateDto(CreateExerciseDto, exerciseDto);
    exerciseDto.coachId = req.account.id;
    const createdExercise = await ExerciseService.addExercise(exerciseDto);
    res.send(formatResponse(createdExercise));
  });
  static getExercise = asyncHandler(async (req, res) => {
    const exerciseId = req.params.id;
    const exercise = await ExerciseService.getExercise(exerciseId);
    res.send(formatResponse(exercise));
  });
  static updateExercise = asyncHandler(async (req: RequestWithAccount, res) => {
    const exerciseId = req.params.id;
    const exercise = await ExerciseService.getExercise(exerciseId);
    if (exercise.coachId !== req.account.id) throw new UnauthorizedException();
    const exerciseDto: UpdateExerciseDto = req.body;
    await validateDto(UpdateExerciseDto, exerciseDto);
    const updatedExercise = await ExerciseService.updateExercise(exerciseDto, exerciseId);
    res.send(formatResponse(updatedExercise));
  });
  static deleteExercise = asyncHandler(async (req: RequestWithAccount, res) => {
    const exerciseId = req.params.id;
    const exercise = await ExerciseService.getExercise(exerciseId);
    if (exercise.coachId !== req.account.id) throw new UnauthorizedException();
    const deletedExercise = await ExerciseService.deleteExercise(exerciseId);
    res.send(formatResponse(deletedExercise));
  });
}
