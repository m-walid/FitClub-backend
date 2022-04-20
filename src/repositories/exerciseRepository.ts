import { prisma } from '@/config/config';
import CreateExerciseDto from '@/dtos/createExerciseDto';
import UpdateExerciseDto from '@/dtos/updateExerciseDto';
import Exception from '@/exceptions/Exception';

export default class ExerciseRepository {
  static addExerciseByAccountId = async (exerciseDto: CreateExerciseDto) => {
    const exercise = await prisma.exercise.create({
      data: exerciseDto,
    });
    return exercise;
  };
  static getExerciseById = async (exerciseId: string) => {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
    if (!exercise) throw new Exception('Exercise not found');
    return exercise;
  };
  static getExercisesByAccountId = async (accountId: string) => {
    const exercises = await prisma.exercise.findMany({
      where: {
        coachId: accountId,
      },
    });
    return exercises;
  };
  static updateExerciseById = async (exerciseDto: UpdateExerciseDto, exerciseId: string) => {
    const updatedExercise = await prisma.exercise.update({
      where: {
        id: exerciseId,
      },
      data: exerciseDto,
    });
    return updatedExercise;
  };
  static deleteExerciseById = async (exerciseId: string) => {
    const deletedExercise = await prisma.exercise.delete({
      where: {
        id: exerciseId,
      },
    });
    return deletedExercise;
  };
}
