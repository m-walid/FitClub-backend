const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  email: { type: "email" },
};

const emailValidator = v.compile(schema);

module.exports = { emailValidator };
