import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import exceptionHandler from '@middlewares/exceptionHandler';
import notFoundHandler from '@middlewares/notFound';
import { logger } from '@utils/logger';
import authRouter from '@routes/authRouter';
import traineeRouter from '@routes/traineeRouter';
import accountRouter from '@routes/accountRouter';
import uploadRouter from '@routes/uploadRouter';
import exerciseRouter from './routes/exerciseRouter';

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/trainees', traineeRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/uploads', uploadRouter);
app.use('/api/v1/exercises', exerciseRouter);

//not found middleware
app.use('/*', notFoundHandler);
//exception middleware
app.use(exceptionHandler);

(async () => {
  await app.listen(process.env.PORT);
  logger.info(`server running on port: ${process.env.PORT}`);
})();
