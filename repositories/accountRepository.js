const { prisma } = require("../config");
const Exception = require("../exceptions/Exception");
const { exceptionType } = require("../utils/enums/exception.enum");
const { logger } = require("../utils/logger");

const addAccount = async (accounntDto) => {
  try {
    const account = await prisma.account.create({
      data: accounntDto,
    });
    return account;
  } catch (error) {
    throw new Exception("Account already exist");
  }
};

const getAccountByEmail = async (email) => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });
    if (!account) throw new Exception("Couldn't find account", 400, undefined, exceptionType.CUSTOM);
    return account;
  } catch (error) {
    if (error.type !== exceptionType.DEFAULT) throw error;
    logger.error(error);
    throw new Exception();
  }
};

const accountRepository = {
  addAccount,
  getAccountByEmail,
};
module.exports = { accountRepository };
