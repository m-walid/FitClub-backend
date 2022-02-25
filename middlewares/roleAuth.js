const Exception = require("../exceptions/Exception");

const roleAuth = (role) => {
  return (req, res, next) => {
    if (req.account.role !== role) {
      next(new Exception("Unauthorized", 401));
    } else {
      next();
    }
  };
};

module.exports = {
  roleAuth,
};
