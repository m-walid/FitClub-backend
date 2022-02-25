import { prisma } from "../config";
import { Exception } from "../exceptions/Exception";
import { generateOTP } from "../utils/otp";

const addAccount = async (accounntDto) => {
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

const getAccountByEmail = async (email) => {
  const account = await prisma.account.findUnique({
    where: {
      email,
    },
  });
  if (!account) throw new Exception("Couldn't find account", 400);
  return account;
};

const getAccountByEmailWithOtp = async (email) => {
  const account = await prisma.account.findUnique({
    where: {
      email,
    },
    include: {
      otp: true,
    },
  });
  if (!account) throw new Exception("Couldn't find account", 400);
  return account;
};

const updateAccountById = async (id, updatedFields) => {
  const updatedAccount = await prisma.account.update({
    where: {
      id,
    },
    data: updatedFields,
  });
  return updatedAccount;
};
const updateAccountByEmail = async (email, updatedFields) => {
  const updatedAccount = await prisma.account.update({
    where: {
      email,
    },
    data: updatedFields,
    include: {
      otp: true,
    },
  });
  return updatedAccount;
};

const accountRepository = {
  addAccount,
  getAccountByEmail,
  getAccountByEmailWithOtp,
  updateAccountById,
  updateAccountByEmail,
};
export { accountRepository };
