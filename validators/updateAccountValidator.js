const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  firstName: { type: "string", min: 2, optional: true },
  lastName: { type: "string", min: 2, optional: true },
  imgUrl: { type: "string", optional: true },
  $$strict: true,
};

const updateAccountValidator = v.compile(schema);

module.exports = { updateAccountValidator };
