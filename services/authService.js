const bcrypt = require("bcrypt");
const Exception = require("../exceptions/Exception");
const { accountRepository } = require("../repositories/accountRepository");
const { logger } = require("../utils/logger");
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
  const passwordHash = await encrypt(loginBody.password);
  if (account.password !== passwordHash) throw new Exception("Invalid password");
  const tokenPayload = {
    id: account.id,
    role: account.role,
  };
  const token = await jwtService.signToken(tokenPayload);
  return { token };
};

const encrypt = async (payload) => {
  try {
    const hashed = await bcrypt.hash(payload, process.env.SALT);
    return hashed;
  } catch (error) {
    logger.error(error);

    throw new Exception();
  }
};

const authService = { register, login, encrypt };
module.exports = { authService };
