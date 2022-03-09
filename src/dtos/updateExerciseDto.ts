import { ActiveMuscle } from '@/utils/enums/activeMuscle';
import { Allow, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export default class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsString()
  videoUrl: string;

  @IsOptional()
  @IsString()
  imgUrl: string;

  @IsOptional()
  @IsEnum(ActiveMuscle)
  activeMuscle: ActiveMuscle;
}
