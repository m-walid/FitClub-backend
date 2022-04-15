import { Router } from 'express';
import auth from '@/middlewares/auth';
import roleAuth from '@/middlewares/roleAuth';
import { Role } from '@/utils/enums/role.enum';
import ProgramRequestController from '@/controllers/programRequestController';

const programRequestRouter = Router();
programRequestRouter.use(auth);
programRequestRouter.post('/', [roleAuth(Role.TRAINEE), ProgramRequestController.addRequest]);
programRequestRouter.get('/', [ProgramRequestController.getRequests]);
programRequestRouter.get('/:id', [ProgramRequestController.getRequest]);
programRequestRouter.patch('/:id/:status', [roleAuth(Role.COACH), ProgramRequestController.updateRequest]);

export default programRequestRouter;
