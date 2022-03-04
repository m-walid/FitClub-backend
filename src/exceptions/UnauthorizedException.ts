import Exception from './Exception';

export default class UnauthorizedException extends Exception {
  constructor() {
    super('Unauthorized access', 401);
  }
}
