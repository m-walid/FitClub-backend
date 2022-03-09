import { Allow, IsDate, IsInt, IsPositive, IsString, MinLength, IsOptional } from 'class-validator';

export default class UpdateCoachReview {
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsString()
  @MinLength(10)
  @IsOptional()
  description: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  rating: number;

  @Allow()
  coachId: string;
  userId: string;
}
