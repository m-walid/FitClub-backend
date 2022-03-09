import { IsOptional, IsString, MinLength } from 'class-validator';

export default class coachUpdateDto {
  @IsString()
  @MinLength(20)
  @IsOptional()
  bio: string;

  @IsOptional()
  accountId: string;
}
