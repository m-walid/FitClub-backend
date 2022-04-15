import { prisma } from '@/config/config';
import ProgramDto from '@/dtos/programDto';
import Exception from '@/exceptions/Exception';
import ProgramType from '@utils/enums/programType.enum';
const includeBody = {
  weeks: {
    include: {
      days: true,
    },
  },
};
export default class ProgramRepository {
  static addProgramByAccountId = async (programDto: ProgramDto, accountId: string, type = ProgramType.General) => {
    const program = prisma.program.create({
      data: {
        description: programDto.description,
        price: programDto.price,
        type: type,
        title: programDto.title,
        imgUrl: programDto.imgUrl,
        category: programDto.category,
        duration: programDto.weeks.length,
        createdBy: {
          connect: { id: accountId },
        },
        weeks: {
          create: programDto.weeks.map((week) => {
            return {
              order: week.order,
              days: {
                create: week.days.map((day) => {
                  return {
                    order: day.order,
                    exercises: {
                      create: day.exercises.map((exercise) => {
                        return {
                          exercise: { connect: { id: exercise.exerciseId } },
                          order: exercise.order,
                          duration: exercise.duration,
                          sets: exercise.sets,
                          reps: exercise.reps,
                        };
                      }),
                    },
                  };
                }),
              },
            };
          }),
        },
      },
      // include: includeBody,
    });
    return program;
  };
  static getProgramById = async (programId: string) => {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: includeBody,
    });
    if (!program) throw new Exception('Program not found');
    return program;
  };
  static getProgramDayExercisesByDayId = async (dayId: string) => {
    const day = await prisma.programDay.findUnique({
      where: {
        id: dayId,
      },
      include: {
        exercises: {
          include: {
            exercise: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    if (!day) throw new Exception('day not found');
    return day;
  };
  static getProgramsByAccountId = async (accountId: string) => {
    const programs = await prisma.program.findMany({
      where: {
        coachId: accountId,
      },
      include: includeBody,
    });
    return programs;
  };
  static updateProgramById = async (programDto: ProgramDto, programId: string) => {
    const [, updatedProgram] = await prisma.$transaction([
      prisma.programWeek.deleteMany({
        where: {
          programId: programId,
        },
      }),
      prisma.program.update({
        where: {
          id: programId,
        },
        data: {
          description: programDto.description,
          title: programDto.title,
          price: programDto.price,
          imgUrl: programDto.imgUrl,
          category: programDto.category,
          duration: programDto.weeks.length,
          weeks: {
            create: programDto.weeks.map((week) => {
              return {
                order: week.order,
                days: {
                  create: week.days.map((day) => {
                    return {
                      order: day.order,
                      exercises: {
                        create: day.exercises.map((exercise) => {
                          return {
                            exercise: { connect: { id: exercise.exerciseId } },
                            order: exercise.order,
                            duration: exercise.duration,
                            sets: exercise.sets,
                            reps: exercise.reps,
                          };
                        }),
                      },
                    };
                  }),
                },
              };
            }),
          },
        },
      }),
    ]);
    return updatedProgram;
  };
  static deleteProgramById = async (programId: string) => {
    const deletedProgram = await prisma.program.delete({
      where: {
        id: programId,
      },
    });
    return deletedProgram;
  };

  static attachProgramToTrainee = async (programId: string, traineeId: string) => {
    const program = await prisma.userPrograms.create({
      data: {
        program: { connect: { id: programId } },
        user: { connect: { id: traineeId } },
      },
    });
    return program;
  };
}
