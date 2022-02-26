const { Router } = require("express");
const { accountController } = require("../controllers/accountController");
const { auth } = require("../middlewares/auth");
const accountRouter = Router();
accountRouter.use(auth);

accountRouter.route("/:id").get(accountController.getAccount).patch(accountController.updateAccount).delete(accountController.deleteAccount);

module.exports = { accountRouter };
