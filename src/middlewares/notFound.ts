import Exception from '@exceptions/Exception';
export default function notFoundHandler(req, res, next) {
  throw new Exception('Not Found.', 404);
}
