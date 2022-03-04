import { ActiveMuscle } from '@/utils/enums/activeMuscle';
import { Allow, IsEnum, IsString, MinLength } from 'class-validator';

export default class CreateExerciseDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  videoUrl: string;

  @IsString()
  imgUrl: string;

  @IsEnum(ActiveMuscle)
  activeMuscle: ActiveMuscle;

  @Allow()
  coachId: string;
}
