import { Router } from 'express';
import auth from '@/middlewares/auth';
import roleAuth from '@/middlewares/roleAuth';
import { Role } from '@/utils/enums/role.enum';
import billController from '@/controllers/billController';

const billRouter = Router();
billRouter.use(auth);
billRouter.post('/', [roleAuth(Role.TRAINEE), billController.postBill]);
billRouter.post('/:requestId', [roleAuth(Role.TRAINEE), billController.postBillWithRequest]);
billRouter.get('/', [billController.getBills]);
billRouter.get('/:id', [billController.getBill]);
export default billRouter;
