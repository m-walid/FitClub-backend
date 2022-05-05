import { Router } from 'express';
import discoveryController from '@controllers/discoveryController';
import auth from '@middlewares/auth';
const discoveryRouter = Router();
discoveryRouter.use(auth);

discoveryRouter.get('/', discoveryController.getDiscoveryPage);
discoveryRouter.get('/search', discoveryController.search);

export default discoveryRouter;
