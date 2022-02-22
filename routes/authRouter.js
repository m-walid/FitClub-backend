const { Router } = require("express");
const { authController } = require("../controllers/authController");
const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/verify", authController.verifyAccount);
authRouter.post("/send-otp", authController.sendOtp);

module.exports = { authRouter };
