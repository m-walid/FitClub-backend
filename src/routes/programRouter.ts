import { Router } from 'express';
import auth from '@middlewares/auth';
import roleAuth from '@/middlewares/roleAuth';
import { Role } from '@/utils/enums/role.enum';
import ProgramController from '@/controllers/programController';
const programRouter = Router();
programRouter.use(auth);
programRouter.route('/').post([roleAuth(Role.COACH), ProgramController.postProgram]);
programRouter.route('/:requestId').post([roleAuth(Role.COACH), ProgramController.postProgramWithRequest]);
programRouter
  .route('/:id')
  .get([ProgramController.getProgram])
  .patch([roleAuth(Role.COACH), ProgramController.updateProgram])
  .delete([roleAuth(Role.COACH), ProgramController.deleteProgram]);
programRouter.get('/:id/days/:dayId/exercises', [ProgramController.getProgramDayExercises]);
programRouter.post('/:id/reviews', [auth, roleAuth(Role.TRAINEE), ProgramController.postReview]);
programRouter.get('/:id/reviews', [auth, ProgramController.getReviews]);
programRouter.patch('/reviews/:id', [auth, ProgramController.updateReview]);
programRouter.delete('/reviews/:id', [auth, ProgramController.deleteReview]);
export default programRouter;
