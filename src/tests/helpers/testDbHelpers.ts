import { prisma } from '@/config/config';
import RegisterDto from '@/dtos/registerDto';
import jwtService from '@/services/jwtService';
import { Role } from '@/utils/enums/role.enum';
import { generateOTP } from '@/utils/otp';
import AuthService from '@services/authService';

export const cleanDb = async () => {
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        console.log({ error });
      }
    }
  }
};

export const mockTraineeAccount = async (isVerified = true) => {
  const registerDto: RegisterDto = {
    firstName: 'john',
    lastName: 'doe',
    email: 'testtrainee@gmail.com',
    password: await AuthService.encrypt('test1234'),
    role: Role.TRAINEE,
  };
  const account = await prisma.account.create({
    data: {
      ...registerDto,
      isVerified: isVerified,
      otp: {
        create: {
          code: generateOTP(6),
        },
      },
    },
    include: {
      otp: true,
    },
  });
  const tokenPayload = {
    account: {
      id: account.id,
      role: account.role,
    },
  };
  const token = await jwtService.signToken(tokenPayload);
  return { account, token };
};

export const mockCoachAccount = async (isVerified = true) => {
  const registerDto: RegisterDto = {
    firstName: 'john',
    lastName: 'doe',
    email: 'testcoach@gmail.com',
    password: await AuthService.encrypt('test1234'),
    role: Role.COACH,
  };
  const account = await prisma.account.create({
    data: {
      ...registerDto,
      isVerified: isVerified,
      otp: {
        create: {
          code: generateOTP(6),
        },
      },
    },
    include: {
      otp: true,
    },
  });
  const tokenPayload = {
    account: {
      id: account.id,
      role: account.role,
    },
  };
  const token = await jwtService.signToken(tokenPayload);
  return { account, token };
};

export const mockCoachReview = async (userId: string, coachId: string) => {
  return await prisma.coachReviews.create({
    data: {
      description: 'lorem test coach review',
      rating: 5,
      coachId,
      userId,
    },
  });
};

export const mockExercise = async (coachId: string) => {
  return await prisma.exercise.create({
    data: {
      coachId,
      title: 'pushups',
      description: 'lorem sadkljferijflksf',
      videoUrl: 'test',
      imgUrl: 'test',
    },
  });
};
