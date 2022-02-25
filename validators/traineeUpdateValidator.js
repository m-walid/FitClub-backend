const Validator = require("fastest-validator");
const { gender } = require("../utils/enums/gender.enum");
const { goal } = require("../utils/enums/goal.enum");

const v = new Validator();

const schema = {
  age: { type: "number", positive: true, integer: true, optional: true },
  weight: { type: "number", positive: true, integer: true, optional: true },
  height: { type: "number", positive: true, integer: true, optional: true },
  gender: { type: "enum", values: Object.values(gender), optional: true },
  goal: { type: "enum", values: Object.values(goal), optional: true },
};

const traineeUpdateValidator = v.compile(schema);

module.exports = { traineeUpdateValidator };
