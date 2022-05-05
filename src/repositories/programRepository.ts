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

  static getProgramsByTraineeId = async (traineeId: string) => {
    const programs = await prisma.userPrograms.findMany({
      where: {
        userId: traineeId,
      },
      include: {
        program: true,
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
      // include: includeBody,
    });
    return programs;
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
            programReviews: true,
            UserPrograms: true,
          },
        },
        programReviews: {
          select: {
            rating: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imgUrl: true,
          },
        },
      },
      orderBy: {
        programReviews: {
          _count: 'desc',
        },
      },
    });
    programs.map((program: any) => {
      program.rating = program.programReviews.reduce((acc, curr) => acc + curr.rating, 0) / program.programReviews.length;
      delete program.programReviews;
      return program;
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
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
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
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
    return programs;
  };
  static topRatedPrograms = async () => {
    const programs = await prisma.$queryRaw`
    select p.*, avg(pr.rating) as avg_rating,
      jsonb_build_object(
        'id', c.id,
        'firstName', c."firstName",
        'lastName', c."lastName" 
        )  as "createdBy"
    from "Program" p
    join "ProgramReview" pr on pr."programId"  = p.id
    join "Account" c on p."coachId" = c.id 
    group by p.id, c.id
    order by avg_rating desc 
    limit 10;`;
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
      take: 10,
    });
    return programs;
  };
}
