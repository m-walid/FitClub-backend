import { Router } from 'express';

import auth from '@middlewares/auth';
import roleAuth from '@middlewares/roleAuth';
import { Role } from '@utils/enums/role.enum';
import CoachController from '@/controllers/coachController';
const coachRouter = Router();

coachRouter.post('/', [auth, roleAuth(Role.COACH), CoachController.addCoach]);
coachRouter.get('/:id', [auth, CoachController.getCoach]);
coachRouter.patch('/:id', [auth, CoachController.updateCoach]);
coachRouter.get('/:id/exercises', [auth, roleAuth(Role.COACH), CoachController.getExercises]);
coachRouter.get('/:id/programs', [auth, roleAuth(Role.COACH), CoachController.getPrograms]);
coachRouter.post('/:id/reviews', [auth, roleAuth(Role.TRAINEE), CoachController.postReview]);
coachRouter.get('/:id/reviews', [auth, CoachController.getReviews]);
coachRouter.patch('/reviews/:id', [auth, CoachController.updateReview]);
coachRouter.delete('/reviews/:id', [auth, CoachController.deleteReview]);

export default coachRouter;
