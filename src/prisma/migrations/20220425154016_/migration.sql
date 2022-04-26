/*
  Warnings:

  - The primary key for the `DayExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exerciseId` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,dayExerciseId]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `DayExercise` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `dayExerciseId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_exerciseId_fkey";

-- DropIndex
DROP INDEX "UserProgress_userId_programId_exerciseId_key";

-- AlterTable
ALTER TABLE "DayExercise" DROP CONSTRAINT "DayExercise_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DayExercise_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "exerciseId",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dayExerciseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_dayExerciseId_key" ON "UserProgress"("userId", "dayExerciseId");

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_dayExerciseId_fkey" FOREIGN KEY ("dayExerciseId") REFERENCES "DayExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
