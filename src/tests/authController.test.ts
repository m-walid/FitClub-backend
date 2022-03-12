import { Role } from '@utils/enums/role.enum';
import request from 'supertest';
import app from '../app';
import RegisterDto from '@dtos/registerDto';
import { cleanDb, mockTraineeAccount } from './helpers/testDbHelpers';
import OtpDto from '@/dtos/otpDto';
import LoginDto from '@/dtos/loginDto';
import EmailDto from '@/dtos/emailDto';
const authUrl = '/api/v1/auth/';

let account;
afterEach(async () => {
  await cleanDb();
});
describe('api/v1/auth endpoints (auth controller)', () => {
  describe('[POST] Register', () => {
    it('register a new trainee account sucessfully', async () => {
      const registerDto: RegisterDto = {
        firstName: 'john',
        lastName: 'doe',
        email: 'test@gmail.com',
        password: 'test1234',
        role: Role.TRAINEE,
      };
      const response = await request(app)
        .post(authUrl + 'register')
        .send(registerDto)
        .expect(200);
      expect(response.body.data).toHaveProperty('id');
    });

    it('validation error when registering new account', async () => {
      const registerDto: RegisterDto = {
        firstName: 'jo',
        lastName: 'doe',
        email: 'testtrainee@gmail.com',
        password: 'te',
        role: Role.TRAINEE,
      };
      const response = await request(app)
        .post(authUrl + 'register')
        .send(registerDto)
        .expect(400);
      expect(response.body.error.message).toEqual('Validation error');
    });
  });

  describe('[POST] verify account', () => {
    beforeEach(async () => (account = (await mockTraineeAccount(false)).account));
    it('succcessfully verify account', async () => {
      const otpDto: OtpDto = {
        email: account.email,
        code: account.otp.code,
      };
      const response = await request(app)
        .post(authUrl + 'verify')
        .send(otpDto)
        .expect(200);
      expect(response.body.data).toHaveProperty('token');
    });
    it('validation error verify account', async () => {
      const otpDto: OtpDto = {
        email: account.email,
        code: '34',
      };
      const response = await request(app)
        .post(authUrl + 'verify')
        .send(otpDto)
        .expect(400);
      expect(response.body.error.message).toEqual('Validation error');
    });
    it('invalid otp verify account', async () => {
      const otpDto: OtpDto = {
        email: account.email,
        code: '123456',
      };
      const response = await request(app)
        .post(authUrl + 'verify')
        .send(otpDto)
        .expect(400);
      expect(response.body.error.message).toEqual('Invalid OTP');
    });
  });

  describe('[POST] login account', () => {
    beforeEach(async () => (account = (await mockTraineeAccount(true)).account));
    it('succcessfully login account', async () => {
      const loginDto: LoginDto = {
        email: account.email,
        password: 'test1234',
      };
      const response = await request(app)
        .post(authUrl + 'login')
        .send(loginDto)
        .expect(200);
      expect(response.body.data).toHaveProperty('token');
    });
    it('validation error login account', async () => {
      const loginDto: LoginDto = {
        email: account.email,
        password: '34test',
      };
      const response = await request(app)
        .post(authUrl + 'login')
        .send(loginDto)
        .expect(400);
      expect(response.body.error.message).toEqual('Validation error');
    });
    it('wrong credintials login account', async () => {
      const loginDto: LoginDto = {
        email: account.email,
        password: '12345678',
      };
      const response = await request(app)
        .post(authUrl + 'login')
        .send(loginDto)
        .expect(400);
      expect(response.body.error.message).toEqual('Invalid password');
    });
  });

  describe('[POST] send email otp', () => {
    beforeEach(async () => (account = (await mockTraineeAccount(false)).account));
    it('succcessfully send otp account', async () => {
      const emailDto: EmailDto = {
        email: account.email,
      };
      const response = await request(app)
        .post(authUrl + 'send-otp')
        .send(emailDto)
        .expect(200);
      expect(response.body.data).toHaveProperty('id');
    });
  });
});
