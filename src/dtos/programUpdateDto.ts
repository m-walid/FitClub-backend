import { ProgramCategory } from '@/utils/enums/programCategory';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export default class ProgramUpdateDto {
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
  imgUrl: string;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsEnum(ProgramCategory)
  category: ProgramCategory;
}
