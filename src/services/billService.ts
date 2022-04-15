import BillDto from '@/dtos/billDto';
import BillWithRequestDto from '@/dtos/billWithRequestDto';
import BillRepository from '@/repositories/billRepository';

export default class BillService {
  static addBill = async (billDto: BillDto | BillWithRequestDto) => {
    return await BillRepository.addBill(billDto);
  };
  static getBill = async (billId: string) => {
    return await BillRepository.getBill(billId);
  };
  static getBillsByAccountId = async (accountId: string) => {
    return await BillRepository.getBillsByAccountId(accountId);
  };
}
