import { Decimal } from '@prisma/client/runtime';
import { Allow, IsNotEmpty, IsString } from 'class-validator';

export default class BillWithRequestDto {
  @IsString()
  @IsNotEmpty()
  programRequestId: string;
  @IsString()
  @IsNotEmpty()
  coachId: string;

  @Allow()
  traineeId: string;
  @Allow()
  programId: string;

  @Allow()
  amount: Decimal;
}
