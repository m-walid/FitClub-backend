import { prisma } from '@/config/config';
import ProgramDto from '@/dtos/programDto';
import ProgramUpdateDto from '@/dtos/programUpdateDto';
import Exception from '@/exceptions/Exception';
import ProgramType from '@utils/enums/programType.enum';
const includeBody = {
  weeks: {
    include: {
      days: true,
    },
  },
};
const createByBody = {
  select: {
    id: true,
    firstName: true,
    lastName: true,
    imgUrl: true,
    averageRate: true,
  },
};
export default class ProgramRepository {
  static addProgramByAccountId = async (programDto: ProgramDto, accountId: string, type: ProgramType = ProgramType.General) => {
    const program = await prisma.program.create({
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
  static getProgramByIdForTrainee = async (programId: string, traineeId: string) => {
    const program = await prisma.program.findFirst({
      where: {
        id: programId,
        UserPrograms: {
          some: {
            userId: traineeId,
          },
        },
      },
      include: {
        createdBy: true,
        weeks: {
          include: {
            days: {
              include: {
                exercises: {
                  include: {
                    exercise: {
                      select: {
                        id: true,
                        title: true,
                        imgUrl: true,
                      },
                    },
                    userProgress: {
                      where: {
                        userId: traineeId,
                        programId: programId,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
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
                title: true,
                imgUrl: true,
              },
            },
          },
        },
      },
    });
    if (!day) throw new Exception('day not found');
    return day;
  };

  static updateProgramById = async (programDto: ProgramUpdateDto, programId: string) => {
    const updatedProgram = await prisma.program.update({
      where: {
        id: programId,
      },
      data: programDto,
    });
    return updatedProgram;
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

  static getProgramsByTraineeId = async (traineeId: string) => {
    const programs = await prisma.userPrograms.findMany({
      where: {
        userId: traineeId,
      },
      include: {
        program: {
          include: {
            createdBy: true,
          },
        },
        // {
        //   include: includeBody,
        // },
      },
    });
    return programs;
  };
  static getProgramsByCoachId = async (coachId: string) => {
    const programs = await prisma.program.findMany({
      where: {
        coachId: coachId,
      },
      include: {
        createdBy: true,
      },
      // include: includeBody,
    });
    return programs;
  };

  static updateProgramCounts = async (programId: string) => {
    const counts = await prisma.programReview.aggregate({
      where: {
        programId: programId,
      },
      _count: true,
      _avg: {
        rating: true,
      },
    });
    await prisma.program.update({
      where: {
        id: programId,
      },
      data: {
        reviewsCount: counts._count,
        averageRate: Math.round(counts._avg.rating),
      },
    });
  };
  static getGeneralProgramsByCoachId = async (coachId: string) => {
    const programs = await prisma.program.findMany({
      where: {
        coachId: coachId,
        type: ProgramType.General,
      },
      include: {
        _count: {
          select: {
            UserPrograms: true,
          },
        },
        createdBy: createByBody,
      },
      orderBy: {
        averageRate: 'desc',
      },
    });
    return programs;
  };

  static mostPopularPrograms = async () => {
    const programs = await prisma.program.findMany({
      where: {
        type: ProgramType.General,
      },
      include: {
        _count: {
          select: {
            UserPrograms: true,
          },
        },
        createdBy: createByBody,
      },
      orderBy: {
        UserPrograms: {
          _count: 'desc',
        },
      },
      take: 10,
    });
    return programs;
  };

  static mostRecentPrograms = async () => {
    const programs = await prisma.program.findMany({
      where: {
        type: ProgramType.General,
      },
      include: {
        createdBy: createByBody,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
    return programs;
  };
  static topRatedPrograms = async () => {
    const programs = await prisma.program.findMany({
      where: {
        type: ProgramType.General,
      },
      include: {
        createdBy: createByBody,
      },
      orderBy: {
        averageRate: 'desc',
      },
      take: 10,
    });
    return programs;
  };
  static searchPrograms = async (query: string) => {
    const programs = await prisma.program.findMany({
      where: {
        type: ProgramType.General,
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        createdBy: createByBody,
      },
      take: 10,
    });
    return programs;
  };

  static hasAccessToProgram = async (programId: string, userId: string) => {
    const [program, userProgram] = await Promise.all([
      prisma.program.findFirst({
        where: {
          id: programId,
          coachId: userId,
        },
      }),
      prisma.userPrograms.findUnique({
        where: {
          programId_userId: {
            programId,
            userId,
          },
        },
      }),
    ]);
    return !!program || !!userProgram;
  };
}
