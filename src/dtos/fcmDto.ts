import { IsNotEmpty, IsString } from 'class-validator';

export default class FcmDto {
  @IsString()
  @IsNotEmpty()
  fcmToken: string;
}
