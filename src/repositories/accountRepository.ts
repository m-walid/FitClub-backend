import { prisma } from '@config';
import Exception from '@exceptions/Exception';
import { generateOTP } from '@utils/otp';
export default class AccountRepository {
  static addAccount = async (accounntDto) => {
    const account = await prisma.account.create({
      data: {
        ...accounntDto,
        otp: {
          create: {
            code: generateOTP(6),
          },
        },
      },
      include: {
        otp: true,
      },
    });
    return account;
  };

  static getAccountByEmail = async (email) => {
    const account = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });
    if (!account) throw new Exception("Couldn't find account", 400);
    return account;
  };
  static getAccountById = async (id) => {
    const account = await prisma.account.findUnique({
      where: {
        id: id,
      },
    });
    if (!account) throw new Exception("Couldn't find account", 400);
    return account;
  };

  static getAccountByEmailWithOtp = async (email) => {
    const account = await prisma.account.findUnique({
      where: {
        email: email,
      },
      include: {
        otp: true,
      },
    });
    if (!account) throw new Exception("Couldn't find account", 400);
    return account;
  };

  static updateAccountById = async (id, updatedFields) => {
    const updatedAccount = await prisma.account.update({
      where: {
        id: id,
      },
      data: updatedFields,
    });
    return updatedAccount;
  };
  static updateAccountByEmail = async (email, updatedFields) => {
    const updatedAccount = await prisma.account.update({
      where: {
        email: email,
      },
      data: updatedFields,
      include: {
        otp: true,
      },
    });
    return updatedAccount;
  };

  static deleteAccount = async (id) => {
    const deletedAccount = await prisma.account.delete({
      where: { id: id },
    });
    return deletedAccount;
  };
}
