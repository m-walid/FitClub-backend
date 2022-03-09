import { Router } from 'express';

import auth from '@middlewares/auth';
import roleAuth from '@middlewares/roleAuth';
import { Role } from '@utils/enums/role.enum';
import CoachController from '@/controllers/coachController';
const coachRouter = Router();

coachRouter.post('/', [auth, roleAuth(Role.COACH), CoachController.addCoach]);
coachRouter.get('/:id', [auth, CoachController.getCoach]);
coachRouter.patch('/:id', [auth, CoachController.updateCoach]);

export default coachRouter;
