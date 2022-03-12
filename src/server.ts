import app from './app';
import { logger } from './utils/logger';

(async () => {
  await app.listen(process.env.PORT);
  logger.info(`environment : ${process.env.NODE_ENV}`);
  logger.info(`server running on port: ${process.env.PORT}`);
})();
