import { Allow, IsDate, IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export default class CreateCoachReview {
  @IsDate()
  createdAt: Date;

  @IsString()
  @MinLength(10)
  description: string;

  @IsInt()
  @IsPositive()
  rating: number;

  @Allow()
  coachId: string;
  userId: string;
}
