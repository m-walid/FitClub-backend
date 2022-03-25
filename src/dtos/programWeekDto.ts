import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, Max, Min, ValidateNested } from 'class-validator';
import ProgramDayDto from './programDayDto';

export default class ProgramWeekDto {
  @Min(1)
  @Max(7)
  @IsInt()
  order: number;

  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => ProgramDayDto)
  days: ProgramDayDto[];
}
