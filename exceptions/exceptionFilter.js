const { exceptionCode } = require("../utils/enums/exception.enum");
const { logger } = require("../utils/logger");
const Exception = require("./Exception");

const exceptionFilter = (error) => {
  if (error.code) {
    switch (error.code) {
      case exceptionCode.CUSTOM:
        return error;
      case "P2002":
        return new Exception(`${error.meta["target"][0]} should be unique`, 400);
      case "P2025":
        return new Exception(`Record to update not found.`, 400);
      case "P2016":
        if (error.meta.details?.includes("Expected a valid parent ID")) return new Exception(`Record to update not found.`, 400);
      // eslint-disable-next-line no-fallthrough
      default:
        logger.debug("CODE: " + error.code);
        logger.warn(error.stack);
        logger.error(JSON.stringify(error));
        // logger.error(error);
        return new Exception();
    }
  }
  logger.warn(error.stack);
  logger.error(JSON.stringify(error));
  return new Exception();
};

module.exports = { exceptionFilter };
