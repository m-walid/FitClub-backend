import crypto from 'crypto';

export const genRandomKey = (size = 8) => {
  return crypto.randomBytes(size).toString('hex').slice(0, size) + '-' + new Date().getTime();
};
