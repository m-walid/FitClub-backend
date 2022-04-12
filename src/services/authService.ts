import bcrypt from 'bcrypt';
import Exception from '@exceptions/Exception';
import accountRepository from '@repositories/accountRepository';
import { checkOtpExpValid } from '@utils/otp';
import jwtService from '@services/jwtService';

export default class AuthService {
  static register = async (registerBody) => {
    const passwordHash = await AuthService.encrypt(registerBody.password);
    const accountDto = {
      ...registerBody,
      password: passwordHash,
    };
    const account = await accountRepository.addAccount(accountDto);
    account.password = null;
    return account;
  };

  static login = async (loginBody) => {
    const account = await accountRepository.getAccountByEmail(loginBody.email);
    if (!account.isVerified) throw new Exception('Account not verified', 401);
    const passwordHash = await AuthService.encrypt(loginBody.password);
    if (account.password !== passwordHash) throw new Exception('Invalid password', 400);
    const tokenPayload = {
      account: {
        id: account.id,
        role: account.role,
      },
    };
    const token = await jwtService.signToken(tokenPayload);
    return { token, id: account.id, role: account.role };
  };

  static verifyAccount = async (verifyBody) => {
    const account = await accountRepository.getAccountByEmailWithOtp(verifyBody.email);
    if (account.isVerified) throw new Exception('Account already verified, please login', 400);
    if (account.otp.code !== verifyBody.code || !checkOtpExpValid(account.otp.updatedAt)) throw new Exception('Invalid OTP', 400);
    await accountRepository.updateAccountById(account.id, { isVerified: true });
    const tokenPayload = {
      account: {
        id: account.id,
        role: account.role,
      },
    };
    const token = await jwtService.signToken(tokenPayload);
    return { token, id: account.id, role: account.role };
  };

  static encrypt = async (payload) => {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(payload, process.env.SALT, (err, hashed) => {
        if (err) reject(err);
        else resolve(hashed);
      });
    });
  };
}
