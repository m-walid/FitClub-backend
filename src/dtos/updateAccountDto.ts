import { IsOptional, IsString, MinLength } from 'class-validator';

export default class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName: string;

  @IsOptional()
  @IsString()
  imgUrl: string;
}
