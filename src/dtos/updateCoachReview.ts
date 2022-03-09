import { Allow, IsDate, IsInt, IsPositive, IsString, MinLength, IsOptional, Max } from 'class-validator';

export default class UpdateCoachReview {
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
