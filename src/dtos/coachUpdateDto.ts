import { IsOptional, IsString, MinLength } from 'class-validator';

export default class coachUpdateDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  firstName: string;

  @IsOptional()
  accountId: string;
}
