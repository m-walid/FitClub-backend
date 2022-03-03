import asyncHandler from 'express-async-handler';
import formatResponse from '@utils/formatResponse';
import uploadService from '@services/uploadService';

export default class uploadConrtoller {
  static getUploadUrl = asyncHandler(async (req, res) => {
    const urlnums = req.query.num || 1;
    const urls = await uploadService.getMultipleUploadUrls(urlnums);
    const uploadUrlResponse = formatResponse(urls);
    res.send(uploadUrlResponse);
  });
}
