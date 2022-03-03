import { jwtAccountPayload } from '@/interfaces/authInterface';
import jwt from 'jsonwebtoken';

export default class JwtService {
  static verifyToken = (token) => {
    return new Promise<any>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });
  };

  static signToken = (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
        if (err) reject(err);
        else {
          resolve(token);
        }
      });
    });
  };
}
