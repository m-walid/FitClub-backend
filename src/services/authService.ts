import bcrypt from "bcrypt";
import { Exception } from "../exceptions/Exception";
import { accountRepository } from "../repositories/accountRepository";
import { checkOtpExpValid } from "../utils/otp";
import { jwtService } from "./jwtService";
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
  if (!account.isVerified) throw new Exception("Account not verified");
  const passwordHash = await encrypt(loginBody.password);
  if (account.password !== passwordHash)
    throw new Exception("Invalid password");
  const tokenPayload = {
    id: account.id,
    role: account.role,
  };
  const token = await jwtService.signToken(tokenPayload);
  return { token };
};

const verifyAccount = async (verifyBody) => {
  const account = await accountRepository.getAccountByEmailWithOtp(
    verifyBody.email
  );
  if (account.isVerified)
    throw new Exception("Account already verified, please login");
  if (
    account.otp.code !== verifyBody.code ||
    !checkOtpExpValid(account.otp.updatedAt)
  )
    throw new Exception("Invalid OTP");
  await accountRepository.updateAccountById(account.id, {
    isVerified: true,
  });
  const tokenPayload = {
    id: account.id,
    role: account.role,
  };
  const token = await jwtService.signToken(tokenPayload);
  return { token };
};

const encrypt = async (payload) => {
  const hashed = await bcrypt.hash(payload, process.env.SALT);
  return hashed;
};

const authService = { register, login, encrypt, verifyAccount };
export { authService };
