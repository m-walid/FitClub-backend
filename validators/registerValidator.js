const Validator = require("fastest-validator");
const { roles } = require("../utils/enums/role.enum");

const v = new Validator();

const schema = {
  firstName: { type: "string", min: 2 },
  lastName: { type: "string", min: 2 },
  email: { type: "email" },
  password: { type: "string", min: 8 },
  role: { type: "enum", values: Object.values(roles), optional: true },
  $$strict: true,
};

const registerValidator = v.compile(schema);

module.exports = { registerValidator };
