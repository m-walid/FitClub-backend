const { traineeProfileService } = require("../services/traineeProfileService");
const { traineeUpdateValidator } = require("../validators/traineeUpdateValidator");
const { traineeValidator } = require("../validators/traineeValidator");
const { validate } = require("../validators/validator");
const asyncHandler = require("express-async-handler");
const { formatResponse } = require("../utils/formatResponse");
const Exception = require("../exceptions/Exception");

const addTrainee = asyncHandler(async (req, res) => {
  const traineeBody = req.body;
  validate(traineeValidator, traineeBody);
  traineeBody.accountId = req.account.id;
  const profile = await traineeProfileService.addTrainee(traineeBody);
  const profileResponse = formatResponse(profile);
  res.send(profileResponse);
});
const getTrainee = asyncHandler(async (req, res) => {
  const traineeBody = req.body;
  validate(traineeValidator, traineeBody);
  traineeBody.accountId = req.account.id;
  const profile = await traineeProfileService.getTrainee(traineeBody);
  const profileResponse = formatResponse(profile);
  res.send(profileResponse);
});
const updateTrainee = asyncHandler(async (req, res) => {
  const traineeBody = req.body;
  if(req.params.id !== req.account.id) throw new Exception("Unauthorized access", 401);
  validate(traineeUpdateValidator, traineeBody);
  traineeBody.accountId = req.account.id;
  const profile = await traineeProfileService.updateTrainee(traineeBody);
  const profileResponse = formatResponse(profile);
  res.send(profileResponse);
});

const traineeController = {
  addTrainee,
  getTrainee,
  updateTrainee,
};

module.exports = { traineeController };
