import { validateOrReject } from "class-validator";
import { Exception } from "../exceptions/Exception";

export default abstract class BaseDto {
  abstract parse(obj: any): any;

  async validate() {
    try {
      await validateOrReject(this);
    } catch (error) {
      throw new Exception("Validation error", 400, error);
    }
  }
}
