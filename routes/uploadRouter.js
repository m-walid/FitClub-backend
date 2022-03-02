const { Router } = require("express");
const { uploadConrtoller } = require("../controllers/uploadController");
const { auth } = require("../middlewares/auth");
const uploadRouter = Router();
uploadRouter.use(auth);

uploadRouter.route("/").get([auth, uploadConrtoller.getUploadUrl]);

module.exports = { uploadRouter };
