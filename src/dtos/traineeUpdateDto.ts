import { Gender } from '@/utils/enums/gender.enum';
import { Goal } from '@/utils/enums/goal.enum';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
export default class TraineeUpdateDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  weight: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  height: number;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsEnum(Goal)
  goal: Goal;

  @IsOptional()
  accountId: string;
}
