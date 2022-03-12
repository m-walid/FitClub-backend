import { IsOptional, IsString, MinLength } from 'class-validator';

export default class CoachDto {
  @IsString()
  @MinLength(20)
  bio: string;

  @IsOptional()
  accountId: string;
}
