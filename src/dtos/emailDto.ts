import { IsEmail } from 'class-validator';

export default class EmailDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;
}
