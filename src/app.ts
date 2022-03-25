import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `./${process.env.NODE_ENV || 'test'}.env`,
});

import exceptionHandler from '@middlewares/exceptionHandler';
import notFoundHandler from '@middlewares/notFound';
import authRouter from '@routes/authRouter';
import traineeRouter from '@routes/traineeRouter';
import accountRouter from '@routes/accountRouter';
import uploadRouter from '@routes/uploadRouter';
import exerciseRouter from './routes/exerciseRouter';
import coachRouter from './routes/coachRouter';
import programRouter from './routes/programRouter';

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
app.use('/api/v1/coaches', coachRouter);
app.use('/api/v1/programs', programRouter);

const swaggerDocument = YAML.load('api-documentation.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//not found middleware
app.use('/*', notFoundHandler);
//exception middleware
app.use(exceptionHandler);

export default app;
