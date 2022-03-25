import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, Max, Min, ValidateNested } from 'class-validator';
import ProgramDayExerciseDto from './programDayExerciseDto';

export default class ProgramDayDto {
  @Min(1)
  @Max(7)
  @IsInt()
  order: number;

  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => ProgramDayExerciseDto)
  exercises: ProgramDayExerciseDto[];
}
