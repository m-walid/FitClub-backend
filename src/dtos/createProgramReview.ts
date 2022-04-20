import { Allow, IsInt, IsPositive, IsString, Max, MinLength } from 'class-validator';

export default class CreateProgramReview {
  @IsString()
  @MinLength(10)
  description: string;

  @IsInt()
  @IsPositive()
  @Max(5)
  rating: number;

  @Allow()
  programId: string;
  @Allow()
  userId: string;
}
