import AuthController from '@/controllers/authController';
import { Router } from 'express';
const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.post('/verify', AuthController.verifyAccount);
authRouter.post('/send-otp', AuthController.sendOtp);

export default authRouter;
