import { prisma } from '@/config/config';
import BillDto from '@/dtos/billDto';
import Exception from '@/exceptions/Exception';

export default class BillRepository {
  static async addBill(billDto: BillDto) {
    const createdBill = await prisma.bill.create({
      data: {
        program: { connect: { id: billDto.programId } },
        trainee: { connect: { id: billDto.traineeId } },
        coach: { connect: { id: billDto.coachId } },
        amount: billDto.amount,
      },
    });
    return createdBill;
  }

  static async getBill(billId: string) {
    const bill = await prisma.bill.findUnique({
      where: {
        id: billId,
      },
    });
    if (!bill) throw new Exception('Bill not found');
    return bill;
  }

  static async getBillsByAccountId(accountId: string) {
    const bills = await prisma.bill.findMany({
      where: {
        OR: [{ traineeId: accountId }, { coachId: accountId }],
      },
    });
    return bills;
  }
}
