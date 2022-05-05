import Exception from '@/exceptions/Exception';
import DiscoveryService from '@/services/discoveryService';
import formatResponse from '@/utils/formatResponse';
import asyncHandler from 'express-async-handler';
export default class DiscoveryController {
  static getDiscoveryPage = asyncHandler(async (req, res) => {
    res.send(formatResponse(await DiscoveryService.getDiscoveryPage()));
  });
  static search = asyncHandler(async (req, res) => {
    const query = req.query.q as string;
    if (!query || query.length < 1) throw new Exception('Query is required', 400);
    res.send(formatResponse(await DiscoveryService.search(query.trim())));
  });
}
