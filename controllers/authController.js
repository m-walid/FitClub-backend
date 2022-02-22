const { authService } = require("../services/authService");
const {formatResponse} = require("../utils/formatResponse");
const { registerValidator } = require("../validators/registerValidator");
const { validate } = require("../validators/validator");
const asyncHandler = require("express-async-handler");
const { loginValidator } = require("../validators/loginValidator");

const register = asyncHandler(async (req, res) => {
  const registerBody = req.body;
  validate(registerValidator, registerBody);
  const account = await authService.register(registerBody);
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

const authController = {
  register,
  login,
};

module.exports = { authController };
