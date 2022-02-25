import EmailDto from "../dtos/EmailDto";
import { accountRepository } from "../repositories/accountRepository";
import { generateOTP } from "../utils/otp";

const refreshAccountOtp = async (emailDto: EmailDto) => {
  const updatedAccount = await accountRepository.updateAccountByEmail(emailDto.email, {
    otp: {
      update: {
        code: generateOTP(6),
      },
    },
  });
  updatedAccount.password = null;
  return updatedAccount;
};

const accountService = {
  refreshAccountOtp,
};

export { accountService };
