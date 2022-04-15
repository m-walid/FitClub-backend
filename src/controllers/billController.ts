import BillDto from '@/dtos/billDto';
import validateDto from '@/dtos/validate';
import Exception from '@/exceptions/Exception';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import { RequestWithAccount } from '@/interfaces/authInterface';
import BillService from '@/services/billService';
import ProgramRequestService from '@/services/programRequestService';
import ProgramService from '@/services/programService';
import ProgramRequestStatus from '@/utils/enums/programRequestStatus';
import formatResponse from '@/utils/formatResponse';
import asyncHandler from 'express-async-handler';

export default class BillController {
  static postBill = asyncHandler(async (req: RequestWithAccount, res) => {
    const billDto: BillDto = req.body;
    await validateDto(BillDto, billDto);
    billDto.traineeId = req.account.id;
    const program = await ProgramService.getProgram(billDto.programId);
    billDto.amount = program.price;
    // TODO: USE TRANSACTION
    const createdBill = await BillService.addBill(billDto);
    await ProgramService.attachProgramToTrainee(billDto.programId, billDto.traineeId);
    res.send(formatResponse(createdBill));
  });

  static postBillWithRequest = asyncHandler(async (req: RequestWithAccount, res) => {
    const billDto: BillDto = req.body;
    const programRequestId = req.params.requestId;
    await validateDto(BillDto, billDto);
    billDto.traineeId = req.account.id;
    const programRequest = await ProgramRequestService.getProgramRequestById(programRequestId);
    if (programRequest.traineeId !== req.account.id) throw new UnauthorizedException();
    if (programRequest.status !== ProgramRequestStatus.Done) throw new Exception('Program request is not done');
    if (!programRequest.programId) throw new Exception('Program request does not have a program');
    billDto.programId = programRequest.programId;
    const program = await ProgramService.getProgram(billDto.programId);
    billDto.amount = program.price;
    // TODO: USE TRANSACTION
    const createdBill = await BillService.addBill(billDto);
    await ProgramService.attachProgramToTrainee(billDto.programId, billDto.traineeId);
    await ProgramRequestService.updateProgramRequestStatus(programRequestId, ProgramRequestStatus.Delivered);
    res.send(formatResponse(createdBill));
  });

  static getBill = asyncHandler(async (req: RequestWithAccount, res) => {
    const billId = req.params.id;
    const userId = req.account.id;
    const bill = await BillService.getBill(billId);
    if (bill.traineeId !== userId && bill.coachId !== userId) throw new UnauthorizedException();
    res.send(formatResponse(bill));
  });

  static getBills = asyncHandler(async (req: RequestWithAccount, res) => {
    const bills = await BillService.getBillsByAccountId(req.account.id);
    res.send(formatResponse(bills));
  });
}
