/*
  Warnings:

  - Made the column `averageRate` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `averageRate` on table `Program` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reviewsCount` on table `Program` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "averageRate" SET NOT NULL,
ALTER COLUMN "averageRate" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "averageRate" SET NOT NULL,
ALTER COLUMN "averageRate" SET DEFAULT 0,
ALTER COLUMN "reviewsCount" SET NOT NULL,
ALTER COLUMN "reviewsCount" SET DEFAULT 0;
