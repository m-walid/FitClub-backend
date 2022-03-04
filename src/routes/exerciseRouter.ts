import { Router } from 'express';
import exerciseController from '@controllers/exerciseController';
import auth from '@middlewares/auth';
import roleAuth from '@/middlewares/roleAuth';
import { Role } from '@/utils/enums/role.enum';
const exerciseRouter = Router();
exerciseRouter.use(auth);
exerciseRouter.route('/').post([roleAuth(Role.COACH), exerciseController.postExercise]);

exerciseRouter
  .route('/:id')
  .get(exerciseController.getExercise)
  .patch([roleAuth(Role.COACH), exerciseController.updateExercise])
  .delete([roleAuth(Role.COACH), exerciseController.deleteExercise]);

export default exerciseRouter;
