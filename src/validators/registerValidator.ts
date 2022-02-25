import Validator from "fastest-validator";
import { Role } from "../utils/enums/role.enum";

const v = new Validator();

const schema = {
  firstName: { type: "string", min: 2 },
  lastName: { type: "string", min: 2 },
  email: { type: "email" },
  password: { type: "string", min: 8 },
  role: { type: "enum", values: Object.values(Role), optional: true },
};

const registerValidator = v.compile(schema);

export { registerValidator };
