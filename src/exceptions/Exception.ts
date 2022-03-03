import { ExceptionCode } from '@utils/enums/exception.enum';
export default class Exception extends Error {
  status: number;
  errors: any[];
  code: ExceptionCode;
  constructor(message = 'Inernal Error', status = 500, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.code = ExceptionCode.CUSTOM;
  }
}
