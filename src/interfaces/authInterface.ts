import { Request } from 'express';
import { Role } from '@utils/enums/role.enum';
export interface RequestWithAccount extends Request {
  account: jwtAccountPayload;
}

export interface jwtAccountPayload {
  id: string;
  role: Role;
}
