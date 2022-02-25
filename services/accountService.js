const { accountRepository } = require("../repositories/accountRepository");
const { generateOTP } = require("../utils/otp");

const refreshAccountOtp = async (emailBody) => {
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

const accountService = {
  refreshAccountOtp,
};

module.exports = {
  accountService,
};
