import { prisma } from '@/config/config';
import ProgramRequestDto from '@/dtos/programRequestDto';
import Exception from '@/exceptions/Exception';
import { ProgramRequestStatus } from '@prisma/client';

export default class ProgramRequestRepository {
  static addProgramRequest = async (programRequestDto: ProgramRequestDto) => {
    const programRequest = await prisma.programRequest.create({
      data: {
        trainee: { connect: { id: programRequestDto.traineeId } },
        coach: { connect: { id: programRequestDto.coachId } },
      },
      include: {
        coach: {
          select: {
            firstName: true,
            lastName: true,
            imgUrl: true,
          },
        },
      },
    });
    return programRequest;
  };

  static getProgramRequestForCoach = async (programRequestId: string) => {
    const programRequest = await prisma.programRequest.findUnique({
      where: {
        id: programRequestId,
      },
      include: {
        trainee: {
          include: {
            traineeProfile: true,
          },
        },
      },
    });
    if (!programRequest) throw new Exception('Program request not found');
    return programRequest;
  };

  static getProgramRequestForTrainee = async (programRequestId: string) => {
    const programRequest = await prisma.programRequest.findUnique({
      where: {
        id: programRequestId,
      },
      include: {
        coach: true,
      },
    });
    if (!programRequest) throw new Exception('Program request not found');
    return programRequest;
  };

  static getProgramRequestsForCoach = async (coachId: string) => {
    const programRequests = await prisma.programRequest.findMany({
      where: {
        coachId,
      },
      include: {
        trainee: {
          include: {
            traineeProfile: true,
          },
        },
      },
    });
    if (!programRequests) throw new Exception('Program requests not found');
    return programRequests;
  };

  static getProgramRequestsForTrainee = async (traineeId: string) => {
    const programRequests = await prisma.programRequest.findMany({
      where: {
        traineeId,
      },
      include: {
        coach: true,
      },
    });
    if (!programRequests) throw new Exception('Program requests not found');
    return programRequests;
  };

  static getProgramRequestById = async (programRequestId: string) => {
    const programRequest = await prisma.programRequest.findUnique({
      where: {
        id: programRequestId,
      },
    });
    if (!programRequest) throw new Exception('Program request not found');
    return programRequest;
  };

  static updateProgramRequestStatus = async (programRequestId: string, status: ProgramRequestStatus) => {
    const programRequest = await prisma.programRequest.update({
      where: {
        id: programRequestId,
      },
      data: {
        status,
      },
    });
    return programRequest;
  };
}
