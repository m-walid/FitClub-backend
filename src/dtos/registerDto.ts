import { Role } from '@/utils/enums/role.enum';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
export default class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
