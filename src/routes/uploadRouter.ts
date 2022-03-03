import { Router } from 'express';
import uploadConrtoller from '@controllers/uploadController';
import auth from '@middlewares/auth';
const uploadRouter = Router();
uploadRouter.use(auth);

uploadRouter.route('/').get([auth, uploadConrtoller.getUploadUrl]);

export default uploadRouter;
