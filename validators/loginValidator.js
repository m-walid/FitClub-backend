const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  email: { type: "email" },
  password: { type: "string", min: 8 },
};

const loginValidator = v.compile(schema);

module.exports = { loginValidator };
