import asyncHandler from 'express-async-handler';
import AccountService from '@/services/accountService';
import formatResponse from '@utils/formatResponse';
import { RequestWithAccount } from '@/interfaces/authInterface';
import validateDto from '@/dtos/validate';
import UpdateAccountDto from '@/dtos/updateAccountDto';
import UnauthorizedException from '@/exceptions/UnauthorizedException';
import FcmDto from '@/dtos/fcmDto';

export default class AccountController {
  static getAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.id;
    const account = await AccountService.getAccountById(accountId);
    account.password = null;
    const accountResponse = formatResponse(account);
    res.send(accountResponse);
  });

  static addAccountFcmToken = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.account.id;
    const fcmDto: FcmDto = req.body;
    await validateDto(FcmDto, fcmDto);
    await AccountService.addAccountFcmToken(accountId, fcmDto.fcmToken);
    res.send({
      message: 'Successfully added fcm token',
    });
  });
  static updateAccount = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.params.id;
    if (accountId !== req.account.id) throw new UnauthorizedException();
    const updateAccountDto: UpdateAccountDto = req.body;
    await validateDto(UpdateAccountDto, updateAccountDto);
    const account = await AccountService.updateAccountById(accountId, updateAccountDto);
    account.password = null;
    const accountResponse = formatResponse(account);
    res.send(accountResponse);
  });

  static deleteAccount = asyncHandler(async (req: RequestWithAccount, res) => {
    const accountId = req.params.id;
    if (accountId !== req.account.id) throw new UnauthorizedException();
    const account = await AccountService.deleteAccount(accountId);
    account.password = null;
    const accountResponse = formatResponse(account);
    res.send(accountResponse);
  });
}
