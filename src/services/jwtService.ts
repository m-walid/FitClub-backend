import jwt from "jsonwebtoken";
const verifyToken = (token) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });
};

const signToken = (payload) => {
  return new Promise<any>((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
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
export { jwtService };
