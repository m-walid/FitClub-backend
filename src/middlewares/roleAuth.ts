import Exception from '@exceptions/Exception';

export default function roleAuth(role) {
  return (req, res, next) => {
    if (req.account.role !== role) {
      next(new Exception('Unauthorized', 401));
    } else {
      next();
    }
  };
}
