const { authService } = require("../services/authService");
const { formatResponse } = require("../utils/formatResponse");
const { registerValidator } = require("../validators/registerValidator");
const { validate } = require("../validators/validator");
const asyncHandler = require("express-async-handler");
const { loginValidator } = require("../validators/loginValidator");
const { mailService } = require("../services/mailService");
const { accountService } = require("../services/accountService");
const { otpValidator } = require("../validators/otpValidator");
const { emailValidator } = require("../validators/emailValidator");

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
  const emailBody = req.body;
  validate(emailValidator, emailBody);
  const account = await accountService.refreshAccountOtp(emailBody);
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

module.exports = { authController };
