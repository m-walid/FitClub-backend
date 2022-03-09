import { Allow, IsDate, IsInt, IsPositive, IsString, Max, MinLength } from 'class-validator';

export default class CreateCoachReview {
  @IsString()
  @MinLength(10)
  description: string;

  @IsInt()
  @IsPositive()
  @Max(5)
  rating: number;

  @Allow()
  coachId: string;
  @Allow()
  userId: string;
}
