import { Decimal } from '@prisma/client/runtime';
import { Allow, IsNotEmpty, IsString } from 'class-validator';

export default class BillDto {
  @IsString()
  @IsNotEmpty()
  programId: string;
  @IsString()
  @IsNotEmpty()
  coachId: string;

  @Allow()
  traineeId: string;

  @Allow()
  amount: Decimal;
}
