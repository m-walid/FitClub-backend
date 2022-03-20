import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export default class ProgramDayExerciseDto {
  @Min(1)
  @Max(7)
  @IsInt()
  order: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  reps: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  sets: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration: number;

  @IsString()
  exerciseId: string;
}
