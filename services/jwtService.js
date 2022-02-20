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

module.exports = {
  verifyToken,
};
