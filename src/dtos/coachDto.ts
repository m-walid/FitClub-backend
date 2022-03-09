import { IsOptional, IsString, MinLength } from 'class-validator';

export default class coachDto {
  @IsString()
  @MinLength(20)
  bio: string;

  @IsOptional()
  accountId: string;
}
