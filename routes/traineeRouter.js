const { Router } = require("express");
const { traineeController } = require("../controllers/traineeController");
const { auth } = require("../middlewares/auth");
const { roleAuth } = require("../middlewares/roleAuth");
const { roles } = require("../utils/enums/role.enum");
const traineeRouter = Router();

traineeRouter.post("/", [auth, roleAuth(roles.TRAINEE), traineeController.addTrainee]);
traineeRouter.get("/:id", [auth, traineeController.getTrainee]);
traineeRouter.patch("/:id", [auth, traineeController.updateTrainee]);

module.exports = { traineeRouter };
