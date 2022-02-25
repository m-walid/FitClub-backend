import { ExceptionCode } from "../utils/enums/exception.enum";
import { logger } from "../utils/logger";
import { Exception } from "./Exception";

const exceptionFilter = (error: any) => {
  if (error.code) {
    switch (error.code) {
      case ExceptionCode.CUSTOM:
        return error;
      case "P2002":
        return new Exception(
          `${error.meta["target"][0]} should be unique`,
          400
        );
      case "P2025":
        return new Exception(`Record to update not found.`, 400);
      case "P2016":
        if (error.meta.details?.includes("Expected a valid parent ID"))
          return new Exception(`Record to update not found.`, 400);
        break;
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

export { exceptionFilter };
