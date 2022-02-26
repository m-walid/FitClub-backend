const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  email: { type: "email" },
  password: { type: "string", min: 8 },
  $$strict: true,
};

const loginValidator = v.compile(schema);

module.exports = { loginValidator };
