const crypto = require("crypto");

const genRandomKey = (size = 8) => {
  return crypto.randomBytes(size).toString("hex").slice(0, size) + "-" + new Date().getTime();
};
module.exports = { genRandomKey };
