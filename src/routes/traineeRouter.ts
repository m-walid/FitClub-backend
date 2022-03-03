import { Router } from 'express';
import TraineeController from '@controllers/traineeController';
import auth from '@middlewares/auth';
import roleAuth from '@middlewares/roleAuth';
import { Role } from '@utils/enums/role.enum';
const traineeRouter = Router();

traineeRouter.post('/', [auth, roleAuth(Role.TRAINEE), TraineeController.addTrainee]);
traineeRouter.get('/:id', [auth, TraineeController.getTrainee]);
traineeRouter.patch('/:id', [auth, TraineeController.updateTrainee]);

export default traineeRouter;
