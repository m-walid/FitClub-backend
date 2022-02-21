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
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) return reject(err);
      return token;
    });
  });
};

module.exports = {
  verifyToken,
  signToken,
};
