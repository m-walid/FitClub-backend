import ProgramDto from '@/dtos/programDto';
import ProgramUpdateDto from '@/dtos/programUpdateDto';
import ProgramRepository from '@/repositories/programRepository';
import { ProgramType } from '@prisma/client';

export default class ProgramService {
  static addProgram = async (programDto: ProgramDto, coachId: string, type: ProgramType = ProgramType.General) => {
    return await ProgramRepository.addProgramByAccountId(programDto, coachId, type);
  };
  static getProgram = async (programId: string) => {
    return await ProgramRepository.getProgramById(programId);
  };
  static getProgramDayExercises = async (dayId: string) => {
    return await ProgramRepository.getProgramDayExercisesByDayId(dayId);
  };

  static updateProgram = async (programDto: ProgramUpdateDto, programId: string) => {
    return await ProgramRepository.updateProgramById(programDto, programId);
  };

  static attachProgramToTrainee = async (programId: string, traineeId: string) => {
    return await ProgramRepository.attachProgramToTrainee(programId, traineeId);
  };
  static getProgramsForTrainee = async (traineeId: string) => {
    return await ProgramRepository.getProgramsByTraineeId(traineeId);
  };
  static getProgramsForCoach = async (coachId: string) => {
    return await ProgramRepository.getProgramsByCoachId(coachId);
  };
  static getProgramForTrainee = async (programId: string, traineeId: string) => {
    const program = await ProgramRepository.getProgramByIdForTrainee(programId, traineeId);
    return {
      ...program,
      weeks: program.weeks.map((week) => {
        let isWeekDone = true;
        const days = week.days.map((day) => {
          let isDayDone = true;
          const exercises = day.exercises.map((exercise) => {
            let isExerciseDone = true;
            if (exercise.userProgress.length === 0) {
              isDayDone = false;
              isWeekDone = false;
              isExerciseDone = false;
            }
            delete exercise.userProgress;
            return {
              ...exercise,
              isDone: isExerciseDone,
            };
          });
          return {
            ...day,
            exercises,
            isDone: isDayDone,
          };
        });
        return {
          ...week,
          days,
          isDone: isWeekDone,
        };
      }),
    };
  };

  static getGeneralProgramsForCoach = async (coachId: string) => {
    return await ProgramRepository.getGeneralProgramsByCoachId(coachId);
  };

  static getDiscoveryPrograms = async () => {
    const [topRated, mostPopular, recentlyAdded] = await Promise.all([
      ProgramRepository.topRatedPrograms(),
      ProgramRepository.mostPopularPrograms(),
      ProgramRepository.mostRecentPrograms(),
    ]);
    return {
      topRated,
      mostPopular,
      recentlyAdded,
    };
  };
  static searchPrograms = async (query: string) => {
    return await ProgramRepository.searchPrograms(query);
  };
  static hasAccessToProgram = async (programId: string, userId: string) => {
    return await ProgramRepository.hasAccessToProgram(programId, userId);
  };
}
