import CreateExerciseDto from '@/dtos/createExerciseDto';
import UpdateExerciseDto from '@/dtos/updateExerciseDto';
import ExerciseRepository from '@/repositories/exerciseRepository';

export default class ExerciseService {
  static addExercise = async (exerciseDto: CreateExerciseDto) => {
    return await ExerciseRepository.addExerciseByAccountId(exerciseDto);
  };
  static getExercise = async (exerciseId: string) => {
    return await ExerciseRepository.getExerciseById(exerciseId);
  };
  static getExercises = async (accountId: string) => {
    return await ExerciseRepository.getExercisesByAccountId(accountId);
  };
  static updateExercise = async (exerciseDto: UpdateExerciseDto, exersiseId: string) => {
    return await ExerciseRepository.updateExerciseById(exerciseDto, exersiseId);
  };
  static deleteExercise = async (exerciseId: string) => {
    return await ExerciseRepository.deleteExerciseById(exerciseId);
  };
}
