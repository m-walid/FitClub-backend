import { ProgramCategory } from '@/utils/enums/programCategory';
import { Type } from 'class-transformer';
import { IsArray, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength, ValidateNested } from 'class-validator';
import ProgramWeekDto from './programWeekDto';

export default class ProgramDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  imgUrl: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsEnum(ProgramCategory)
  category: ProgramCategory;

  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => ProgramWeekDto)
  weeks: ProgramWeekDto[];
}
