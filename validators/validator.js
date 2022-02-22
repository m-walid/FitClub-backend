const Exception = require("../exceptions/Exception");

module.exports = {
  validate: (validator, data) => {
    const res = validator(data);
    if (res !== true) throw new Exception("Validation error", 400, res);
  },
};
