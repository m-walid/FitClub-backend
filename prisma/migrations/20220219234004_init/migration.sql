-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TRAINEE', 'COACH');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMALE', 'MALE');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('LOSS', 'FIT');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'TRAINEE',
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachProfile" (
    "accountId" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "CoachProfile_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "TraineeProfile" (
    "accountId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "goal" "Goal" NOT NULL,

    CONSTRAINT "TraineeProfile_pkey" PRIMARY KEY ("accountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "CoachProfile" ADD CONSTRAINT "CoachProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeProfile" ADD CONSTRAINT "TraineeProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
