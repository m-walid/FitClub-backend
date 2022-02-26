const Validator = require("fastest-validator");
const { gender } = require("../utils/enums/gender.enum");
const { goal } = require("../utils/enums/goal.enum");

const v = new Validator();

const schema = {
  age: { type: "number", positive: true, integer: true },
  weight: { type: "number", positive: true, integer: true },
  height: { type: "number", positive: true, integer: true },
  gender: { type: "enum", values: Object.values(gender) },
  goal: { type: "enum", values: Object.values(goal) },
  $$strict: true,
};

const traineeValidator = v.compile(schema);

module.exports = { traineeValidator };
