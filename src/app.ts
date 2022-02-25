import express from "express";
import morgan from "morgan";
import cors from "cors";
require("dotenv").config();

import {exceptionHandler} from "./middlewares/exceptionHandler";
import { authRouter } from "./routes/authRouter";
import { logger } from "./utils/logger";
import { prisma } from "./config";

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routers
app.use("/api/v1/auth", authRouter);

//exception middleware
app.use(exceptionHandler);

(async () => {
  await app.listen(process.env.PORT);
  logger.info(`server running on port: ${process.env.PORT}`);
})();
