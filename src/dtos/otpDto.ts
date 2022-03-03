import { IsEmail, IsString, MinLength } from 'class-validator';
export default class OtpDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsString()
  @MinLength(6)
  code: string;
}
