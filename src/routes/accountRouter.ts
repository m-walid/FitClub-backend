import { Router } from 'express';
import accountController from '@controllers/accountController';
import auth from '@middlewares/auth';
const accountRouter = Router();
accountRouter.use(auth);

accountRouter.route('/:id').get(accountController.getAccount).patch(accountController.updateAccount).delete(accountController.deleteAccount);

export default accountRouter;
