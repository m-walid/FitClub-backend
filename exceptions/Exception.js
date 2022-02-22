const { exceptionCode } = require("../utils/enums/exception.enum");
module.exports = class Exception extends Error {
  constructor(message = "Inernal Error", status = 500, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.code = exceptionCode.CUSTOM;
  }
};
