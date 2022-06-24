import ProgramRequestDto from '@/dtos/programRequestDto';
import Exception from '@/exceptions/Exception';
import ProgramRequestRepository from '@/repositories/programRequestRepository';
import ProgramRequestStatus from '@/utils/enums/programRequestStatus';

export default class ProgramRequestService {
  static addProgramRequest = async (programRequestDto: ProgramRequestDto) => {
    return await ProgramRequestRepository.addProgramRequest(programRequestDto);
  };

  static getProgramRequestForCoach = async (programRequestId: string) => {
    return await ProgramRequestRepository.getProgramRequestForCoach(programRequestId);
  };

  static getProgramRequestForTrainee = async (programRequestId: string) => {
    return await ProgramRequestRepository.getProgramRequestForTrainee(programRequestId);
  };

  static getProgramRequestsForCoach = async (coachId: string) => {
    return await ProgramRequestRepository.getProgramRequestsForCoach(coachId);
  };

  static getProgramRequestsForTrainee = async (traineeId: string) => {
    return await ProgramRequestRepository.getProgramRequestsForTrainee(traineeId);
  };
  static getProgramRequestById = async (programRequestId: string) => {
    return await ProgramRequestRepository.getProgramRequestById(programRequestId);
  };
  static linkProgramToRequest = async (programId: string, programRequestId: string) => {
    return await ProgramRequestRepository.linkProgramToRequest(programId, programRequestId);
  };
  static updateProgramRequestStatus = async (programRequestId: string, status: ProgramRequestStatus) => {
    return await ProgramRequestRepository.updateProgramRequestStatus(programRequestId, status);
  };
  static acceptProgramRequest = async (programRequestId: string) => {
    const programRequest = await ProgramRequestRepository.getProgramRequestById(programRequestId);
    if (programRequest.status !== ProgramRequestStatus.Pending) throw new Exception('Cannot be accepted');
    return await ProgramRequestRepository.updateProgramRequestStatus(programRequestId, ProgramRequestStatus.Preparing);
  };

  static rejectProgramRequest = async (programRequestId: string) => {
    const programRequest = await ProgramRequestRepository.getProgramRequestById(programRequestId);
    if (programRequest.status == ProgramRequestStatus.Delivered) throw new Exception('Already rejected');
    return await ProgramRequestRepository.updateProgramRequestStatus(programRequestId, ProgramRequestStatus.Cancelled);
  };
}
