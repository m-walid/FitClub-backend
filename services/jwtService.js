const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });
};

const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) reject(err);
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
