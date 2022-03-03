import authService from '@services/authService';
import formatResponse from '@utils/formatResponse';
import asyncHandler from 'express-async-handler';
import mailService from '@services/mailService';
import accountService from '@services/accountService';
import RegisterDto from '@/dtos/registerDto';
import validateDto from '@/dtos/validate';
import LoginDto from '@/dtos/loginDto';
import OtpDto from '@/dtos/otpDto';
import EmailDto from '@/dtos/emailDto';

export default class AuthController {
  static register = asyncHandler(async (req, res) => {
    const registerDto: RegisterDto = req.body;
    await validateDto(RegisterDto, registerDto);
    const account = await authService.register(registerDto);
    mailService.sendOtpMail(account.email, account.otp.code);
    account.otp = null;
    const registerResponse = formatResponse(account);
    res.send(registerResponse);
  });
  static login = asyncHandler(async (req, res) => {
    const loginDto: LoginDto = req.body;
    await validateDto(LoginDto, loginDto);
    const token = await authService.login(loginDto);
    const loginResponse = formatResponse(token);
    res.send(loginResponse);
  });

  static verifyAccount = asyncHandler(async (req, res) => {
    const otpDto: OtpDto = req.body;
    await validateDto(OtpDto, otpDto);
    const token = await authService.verifyAccount(otpDto);
    const loginResponse = formatResponse(token);
    res.send(loginResponse);
  });

  static sendOtp = asyncHandler(async (req, res) => {
    const emailDto: EmailDto = req.body;
    await validateDto(EmailDto, emailDto);
    const account = await accountService.refreshAccountOtp(emailDto);
    mailService.sendOtpMail(account.email, account.otp.code);
    account.otp = null;
    const registerResponse = formatResponse(account);
    res.send(registerResponse);
  });
}
