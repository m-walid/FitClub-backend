const Exception = require("../exceptions/Exception");
const notFoundHandler = (req, res, next) => {
  throw new Exception("Not Found.", 404);
};

module.exports = { notFoundHandler };
