import { Role } from "../utils/enums/role.enum";

import { Exception } from "../exceptions/Exception";

const roleAuth = (role: Role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      next(new Exception("Unauthorized", 401));
    } else {
      next();
    }
  };
};

export { roleAuth };
