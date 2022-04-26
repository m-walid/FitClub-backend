/*
  Warnings:

  - You are about to drop the column `dayNo` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseNo` on the `UserProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,programId,exerciseId]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "dayNo",
DROP COLUMN "exerciseNo",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_programId_exerciseId_key" ON "UserProgress"("userId", "programId", "exerciseId");
