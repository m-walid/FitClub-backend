import { IsOptional, IsString, MinLength } from 'class-validator';

export default class coachDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsOptional()
  accountId: string;
}
