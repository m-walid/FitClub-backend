const { jwtService } = require("../services/jwtService");
const Exception = require("../exceptions/Exception");
module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) next(new Exception("please login", 401));
  else {
    try {
      const res = await jwtService.verifyToken(token);
      req.account = res.account;
      next();
    } catch (error) {
      next(new Exception("invalid token please login again", 403));
    }
  }
};
