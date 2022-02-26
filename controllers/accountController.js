const asyncHandler = require("express-async-handler");
const { accountRepository } = require("../repositories/accountRepository");
const { formatResponse } = require("../utils/formatResponse");
const Exception = require("../exceptions/Exception");
const { validate } = require("../validators/validator");
const { updateAccountValidator } = require("../validators/updateAccountValidator");

const getAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await accountRepository.getAccountById(accountId);
  const accountResponse = formatResponse(account);
  res.send(accountResponse);
});

const updateAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  if (accountId !== req.account.id) throw new Exception("Unauthorized access", 401);
  const updateAccountBody = req.body;
  validate(updateAccountValidator, updateAccountBody);
  const account = await accountRepository.updateAccountById(accountId, updateAccountBody);
  account.password = null;
  const accountResponse = formatResponse(account);
  res.send(accountResponse);
});

const deleteAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  if (accountId !== req.account.id) throw new Exception("Unauthorized access", 401);
  const account = await accountRepository.deleteAccount(accountId);
  account.password = null;
  const accountResponse = formatResponse(account);
  res.send(accountResponse);
});

const accountController = {
  getAccount,
  deleteAccount,
  updateAccount,
};
module.exports = {
  accountController,
};
