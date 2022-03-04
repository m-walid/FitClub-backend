import Exception from '@exceptions/Exception';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export default async function validateDto(dtoClass, dto) {
  try {
    await validateOrReject(plainToInstance(dtoClass, dto), { whitelist: true, forbidNonWhitelisted: true });
  } catch (errors) {
    throw new Exception('Validation error', 400, errors);
  }
}
