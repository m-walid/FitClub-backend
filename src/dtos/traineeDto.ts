import { Gender } from '@/utils/enums/gender.enum';
import { Goal } from '@/utils/enums/goal.enum';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
export default class TraineeDto {
  @IsInt()
  @IsPositive()
  age: number;

  @IsInt()
  @IsPositive()
  weight: number;

  @IsInt()
  @IsPositive()
  height: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(Goal)
  goal: Goal;

  @IsOptional()
  accountId: string;
}
