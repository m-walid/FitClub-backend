import ProgramDto from '@/dtos/programDto';
import ProgramRepository from '@/repositories/programRepository';
import { ProgramType } from '@prisma/client';

export default class ProgramService {
  static addProgram = async (programDto: ProgramDto, coachId: string, type = ProgramType.General) => {
    return await ProgramRepository.addProgramByAccountId(programDto, coachId, type);
  };
  static getProgram = async (programId: string) => {
    return await ProgramRepository.getProgramById(programId);
  };
  static getProgramDayExercises = async (dayId: string) => {
    return await ProgramRepository.getProgramDayExercisesByDayId(dayId);
  };
  static getPrograms = async (accountId: string) => {
    return await ProgramRepository.getProgramsByAccountId(accountId);
  };
  static updateProgram = async (programDto: ProgramDto, programId: string) => {
    return await ProgramRepository.updateProgramById(programDto, programId);
  };
  static deleteProgram = async (programId: string) => {
    return await ProgramRepository.deleteProgramById(programId);
  };

  static attachProgramToTrainee = async (programId: string, traineeId: string) => {
    return await ProgramRepository.attachProgramToTrainee(programId, traineeId);
  };
}
