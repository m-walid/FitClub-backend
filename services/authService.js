const bcrypt = require("bcrypt");
const Exception = require("../exceptions/Exception");
const { accountRepository } = require("../repositories/accountRepository");
const { checkOtpExpValid } = require("../utils/otp");
const { jwtService } = require("./jwtService");
const register = async (registerBody) => {
  const passwordHash = await encrypt(registerBody.password);
  const accountDto = {
    ...registerBody,
    password: passwordHash,
  };
  const account = await accountRepository.addAccount(accountDto);
  account.password = null;
  return account;
};

const login = async (loginBody) => {
  const account = await accountRepository.getAccountByEmail(loginBody.email);
  if (!account.isVerified) throw new Exception("Account not verified", 401);
  const passwordHash = await encrypt(loginBody.password);
  if (account.password !== passwordHash) throw new Exception("Invalid password", 400);
  const tokenPayload = {
    account: {
      id: account.id,
      role: account.role,
    },
  };
  const token = await jwtService.signToken(tokenPayload);
  return { token };
};

const verifyAccount = async (verifyBody) => {
  const account = await accountRepository.getAccountByEmailWithOtp(verifyBody.email);
  if (account.isVerified) throw new Exception("Account already verified, please login", 400);
  if (account.otp.code !== verifyBody.code || !checkOtpExpValid(account.otp.updatedAt)) throw new Exception("Invalid OTP", 400);
  await accountRepository.updateAccountById(account.id, { isVerified: true });
  const tokenPayload = {
    account: {
      id: account.id,
      role: account.role,
    },
  };
  const token = await jwtService.signToken(tokenPayload);
  return { token };
};

const encrypt = async (payload) => {
  const hashed = await bcrypt.hash(payload, process.env.SALT);
  return hashed;
};

const authService = { register, login, encrypt, verifyAccount };
module.exports = { authService };
