import asyncHandler from 'express-async-handler';
import accountRepository from '@repositories/accountRepository';
import formatResponse from '@utils/formatResponse';
import Exception from '@exceptions/Exception';
import { RequestWithAccount } from '@/interfaces/authInterface';
import validateDto from '@/dtos/validate';
import UpdateAccountDto from '@/dtos/updateAccountDto';

export default class AccountController {
  static getAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.id;
    const account = await accountRepository.getAccountById(accountId);
    const accountResponse = formatResponse(account);
    res.send(accountResponse);
  });

  static updateAccount = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.params.id;
    if (accountId !== req.account.id) throw new Exception('Unauthorized access', 401);
    const updateAccountDto: UpdateAccountDto = req.body;
    await validateDto(UpdateAccountDto, updateAccountDto);
    const account = await accountRepository.updateAccountById(accountId, updateAccountDto);
    account.password = null;
    const accountResponse = formatResponse(account);
    res.send(accountResponse);
  });

  static deleteAccount = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.params.id;
    if (accountId !== req.account.id) throw new Exception('Unauthorized access', 401);
    const account = await accountRepository.deleteAccount(accountId);
    account.password = null;
    const accountResponse = formatResponse(account);
    res.send(accountResponse);
  });
}
