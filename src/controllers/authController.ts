import asyncHandler from "express-async-handler";
import { authService } from "../services/authService";
import { formatResponse } from "../utils/formatResponse";
import { registerValidator } from "../validators/registerValidator";
import { validate } from "../validators/validator";
import { loginValidator } from "../validators/loginValidator";
import { mailService } from "../services/mailService";
import { accountService } from "../services/accountService";
import { otpValidator } from "../validators/otpValidator";
import { emailValidator } from "../validators/emailValidator";
import EmailDto from "../dtos/EmailDto";
import { validateOrReject } from "class-validator";

const register = asyncHandler(async (req, res) => {
  const registerBody = req.body;
  validate(registerValidator, registerBody);
  const account = await authService.register(registerBody);
  mailService.sendOtpMail(account.email, account.otp.code);
  account.otp = null;
  const registerResponse = formatResponse(account);
  res.send(registerResponse);
});
const login = asyncHandler(async (req, res) => {
  const loginBody = req.body;
  validate(loginValidator, loginBody);
  const token = await authService.login(loginBody);
  const loginResponse = formatResponse(token);
  res.send(loginResponse);
});

const verifyAccount = asyncHandler(async (req, res) => {
  const otpBody = req.body;
  validate(otpValidator, otpBody);
  const token = await authService.verifyAccount(otpBody);
  const loginResponse = formatResponse(token);
  res.send(loginResponse);
});

const sendOtp = asyncHandler(async (req, res) => {
  const emailDto = new EmailDto().parse(req.body);
  await emailDto.validate();
  const account = await accountService.refreshAccountOtp(emailDto);
  mailService.sendOtpMail(account.email, account.otp.code);
  account.otp = null;
  const registerResponse = formatResponse(account);
  res.send(registerResponse);
});

const authController = {
  register,
  login,
  verifyAccount,
  sendOtp,
};

export { authController };
