const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const exceptionHandler = require("./middlewares/exceptionHandler");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routers

app.use(exceptionHandler);

(async () => {
  try {
    await app.listen(process.env.PORT);
    console.log(`server running on port: ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
})();
