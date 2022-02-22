const { exceptionFilter } = require("../exceptions/exceptionFilter");
const { logger } = require("../utils/logger");

module.exports = (error, request, response, next) => {
  error = exceptionFilter(error);
  response.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message,
      errors: error.errors,
      // stack: process.env.NODE_ENV === "dev" ? error.stack : null,
    },
  });
};
