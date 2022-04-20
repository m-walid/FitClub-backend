import { Allow, IsDate, IsInt, IsPositive, IsString, MinLength, IsOptional, Max } from 'class-validator';

export default class UpdateProgramReview {
  @IsString()
  @MinLength(10)
  @IsOptional()
  description: string;

  @IsInt()
  @IsPositive()
  @Max(5)
  @IsOptional()
  rating: number;
}
