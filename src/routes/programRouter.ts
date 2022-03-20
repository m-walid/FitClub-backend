import { Router } from 'express';
import auth from '@middlewares/auth';
import roleAuth from '@/middlewares/roleAuth';
import { Role } from '@/utils/enums/role.enum';
import ProgramController from '@/controllers/programController';
const programRouter = Router();
programRouter.use(auth);
programRouter.route('/').post([roleAuth(Role.COACH), ProgramController.postProgram]);
programRouter
  .route('/:id')
  .get([ProgramController.getProgram])
  .patch([roleAuth(Role.COACH), ProgramController.updateProgram])
  .delete([roleAuth(Role.COACH), ProgramController.deleteProgram]);
export default programRouter;
