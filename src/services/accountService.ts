import accountRepository from '@repositories/accountRepository';
import { generateOTP } from '@utils/otp';

export default class AccountService {
  static refreshAccountOtp = async (emailBody) => {
    const updatedAccount = await accountRepository.updateAccountByEmail(emailBody.email, {
      otp: {
        update: {
          code: generateOTP(6),
        },
      },
    });
    updatedAccount.password = null;
    return updatedAccount;
  };
  static addAccount = async (accountDto) => await accountRepository.addAccount(accountDto);
  static addAccountFcmToken = async (accountId, fcmToken) => await accountRepository.addAccountFcmToken(accountId, fcmToken);
  static getAccountByEmail = async (email) => await accountRepository.getAccountByEmail(email);
  static getAccountById = async (id) => await accountRepository.getAccountById(id);
  static getAccountByEmailWithOtp = async (email) => await accountRepository.getAccountByEmailWithOtp(email);
  static updateAccountById = async (id, updatedFields) => await accountRepository.updateAccountById(id, updatedFields);
  static updateAccountByEmail = async (email, updatedFields) => await accountRepository.updateAccountByEmail(email, updatedFields);
  static deleteAccount = async (id) => await accountRepository.deleteAccount(id);
}
