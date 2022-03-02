const asyncHandler = require("express-async-handler");
const { formatResponse } = require("../utils/formatResponse");
const Exception = require("../exceptions/Exception");
const { uploadService } = require("../services/uploadService");

const getUploadUrl = asyncHandler(async (req, res) => {
  const urlnums = req.query.num || 1;
  const urls = await uploadService.getMultipleUploadUrls(urlnums);
  const uploadUrlResponse = formatResponse(urls);
  res.send(uploadUrlResponse);
});

const uploadConrtoller = {
  getUploadUrl,
};
module.exports = {
  uploadConrtoller,
};
