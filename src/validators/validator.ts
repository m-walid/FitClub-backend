import {Exception} from "../exceptions/Exception";

export const validate = (validator, data) => {
    const res = validator(data);
    if (res !== true) throw new Exception("Validation error", 400, res);
  }
