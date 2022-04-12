/*
  Warnings:

  - You are about to drop the column `activeMuscle` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "activeMuscle";

-- DropEnum
DROP TYPE "ActiveMuscle";
