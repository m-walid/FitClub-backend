const { exceptionType } = require("../utils/enums/exception.enum");
const { logger } = require("../utils/logger");

module.exports = class Exception extends Error {
  constructor(message = "Inernal Error", status = 500, errors, type = exceptionType.DEFAULT) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.type = type;
  }
};
