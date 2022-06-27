import { Router } from 'express';
import auth from '@middlewares/auth';
import roleAuth from '@/middlewares/roleAuth';
import { Role } from '@/utils/enums/role.enum';
import ProgramController from '@/controllers/programController';
const programRouter = Router();
programRouter.use(auth);
programRouter.get('/has-access/:programId', ProgramController.hasAccessToProgram);
programRouter
  .route('/')
  .post([roleAuth(Role.COACH), ProgramController.postProgram])
  .get(ProgramController.getPrograms);
programRouter.route('/:requestId').post([roleAuth(Role.COACH), ProgramController.postProgramWithRequest]);
programRouter
  .route('/:id')
  .get([ProgramController.getProgram])
  .patch([roleAuth(Role.COACH), ProgramController.updateProgram]);
programRouter.get('/:id/days/:dayId/exercises', [ProgramController.getProgramDayExercises]);
programRouter.post('/:id/reviews', [roleAuth(Role.TRAINEE), ProgramController.postReview]);
programRouter.get('/:id/reviews', [ProgramController.getReviews]);
programRouter.patch('/reviews/:id', [ProgramController.updateReview]);
programRouter.delete('/reviews/:id', [ProgramController.deleteReview]);
programRouter.post('/:programId/progress/:dayExerciseId', [ProgramController.toggleExerciseProgressInProgram]);
export default programRouter;
