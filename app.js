const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const exceptionHandler = require("./middlewares/exceptionHandler");
const { authRouter } = require("./routes/authRouter");
const { logger } = require("./utils/logger");
const { prisma } = require("./config");

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
