/*
  Warnings:

  - You are about to drop the column `packageId` on the `ProgramRequest` table. All the data in the column will be lost.
  - You are about to drop the `Billing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackageReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProgramType" AS ENUM ('General', 'Custom');

-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_traineeId_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_coachId_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_programId_fkey";

-- DropForeignKey
ALTER TABLE "PackageReview" DROP CONSTRAINT "PackageReview_packageId_fkey";

-- DropForeignKey
ALTER TABLE "PackageReview" DROP CONSTRAINT "PackageReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramRequest" DROP CONSTRAINT "ProgramRequest_packageId_fkey";

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "type" "ProgramType" NOT NULL DEFAULT E'General';

-- AlterTable
ALTER TABLE "ProgramRequest" DROP COLUMN "packageId";

-- DropTable
DROP TABLE "Billing";

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "PackageReview";

-- CreateTable
CREATE TABLE "ProgramReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "ProgramReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramReview_userId_programId_key" ON "ProgramReview"("userId", "programId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_coachId_traineeId_key" ON "ChatRoom"("coachId", "traineeId");

-- AddForeignKey
ALTER TABLE "ProgramReview" ADD CONSTRAINT "ProgramReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramReview" ADD CONSTRAINT "ProgramReview_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
