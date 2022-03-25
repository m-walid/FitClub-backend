import ProgramDto from '@/dtos/programDto';
import ProgramRepository from '@/repositories/programRepository';

export default class ProgramService {
  static addProgram = async (programDto: ProgramDto, coachId: string) => {
    return await ProgramRepository.addProgramByAccountId(programDto, coachId);
  };
  static getProgram = async (programId: string) => {
    return await ProgramRepository.getProgramById(programId);
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
}
