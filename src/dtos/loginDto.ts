import { IsEmail, IsString, MinLength } from 'class-validator';
export default class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
