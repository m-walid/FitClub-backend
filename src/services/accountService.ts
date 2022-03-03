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
}
