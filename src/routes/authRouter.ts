import { Router } from "express";
import { authController } from "../controllers/authController";
const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/verify", authController.verifyAccount);
authRouter.post("/send-otp", authController.sendOtp);

export { authRouter };
