const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  email: { type: "email" },
  code: { type: "string", length: 6 },
  $$strict: true,
};

const otpValidator = v.compile(schema);

module.exports = { otpValidator };
