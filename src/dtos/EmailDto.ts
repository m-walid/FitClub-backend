import { IsEmail } from "class-validator";
import BaseDto from "./BaseDto";
export default class EmailDto extends BaseDto {
  @IsEmail({ message: "Email is not valid." })
  email: string;

  parse(obj: any) {
    this.email = obj.email;
    return this;
  }
}
