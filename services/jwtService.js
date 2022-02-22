const jwt = require("jsonwebtoken");
const { logger } = require("../utils/logger");
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) logger.error(err);
      else {
        resolve(res);
      }
    });
  });
};

const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) logger.error(err);
      else {
        resolve(token);
      }
    });
  });
};

const jwtService = {
  verifyToken,
  signToken,
};
module.exports = {
  jwtService,
};
