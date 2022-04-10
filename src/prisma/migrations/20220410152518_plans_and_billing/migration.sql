/*
  Warnings:

  - You are about to drop the `CoachPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramPackageReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('General', 'Custom');

-- CreateEnum
CREATE TYPE "ProgramRequestStatus" AS ENUM ('Pending', 'Preparing', 'Done', 'Cancelled');

-- DropForeignKey
ALTER TABLE "CoachPackage" DROP CONSTRAINT "CoachPackage_coachId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramPackage" DROP CONSTRAINT "ProgramPackage_programId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramPackageReview" DROP CONSTRAINT "ProgramPackageReview_programPackageId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramPackageReview" DROP CONSTRAINT "ProgramPackageReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_coachId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_userId_fkey";

-- DropTable
DROP TABLE "CoachPackage";

-- DropTable
DROP TABLE "ProgramPackage";

-- DropTable
DROP TABLE "ProgramPackageReview";

-- DropTable
DROP TABLE "Subscriptions";

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PackageType" NOT NULL DEFAULT E'General',
    "programId" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "coachId" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramRequest" (
    "id" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "packageId" TEXT NOT NULL,
    "status" "ProgramRequestStatus" NOT NULL DEFAULT E'Pending',

    CONSTRAINT "ProgramRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "PackageReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_programId_key" ON "Package"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "PackageReview_userId_packageId_key" ON "PackageReview"("userId", "packageId");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramRequest" ADD CONSTRAINT "ProgramRequest_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramRequest" ADD CONSTRAINT "ProgramRequest_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramRequest" ADD CONSTRAINT "ProgramRequest_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageReview" ADD CONSTRAINT "PackageReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageReview" ADD CONSTRAINT "PackageReview_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
