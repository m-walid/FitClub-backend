const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const exceptionHandler = require("./middlewares/exceptionHandler");
const { notFoundHandler } = require("./middlewares/notFound");
const { logger } = require("./utils/logger");
const { authRouter } = require("./routes/authRouter");
const { traineeRouter } = require("./routes/traineeRouter");
const { accountRouter } = require("./routes/accountRouter");
const { uploadRouter } = require("./routes/uploadRouter");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/trainees", traineeRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/uploads", uploadRouter);

//not found middleware
app.use("/*", notFoundHandler);
//exception middleware
app.use(exceptionHandler);

(async () => {
  await app.listen(process.env.PORT);
  logger.info(`server running on port: ${process.env.PORT}`);
})();
