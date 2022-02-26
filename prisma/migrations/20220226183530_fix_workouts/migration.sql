/*
  Warnings:

  - You are about to drop the column `gifUrl` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseNo` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `ProgramWorkouts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[programId,order]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workoutId,order]` on the table `WorkoutExercises` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imgUrl` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoachProfile" DROP CONSTRAINT "CoachProfile_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_coachId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramWorkouts" DROP CONSTRAINT "ProgramWorkouts_programId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramWorkouts" DROP CONSTRAINT "ProgramWorkouts_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "TraineeProfile" DROP CONSTRAINT "TraineeProfile_accountId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "gifUrl",
ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "exerciseNo",
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "programId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProgramWorkouts";

-- CreateIndex
CREATE UNIQUE INDEX "Workout_programId_order_key" ON "Workout"("programId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercises_workoutId_order_key" ON "WorkoutExercises"("workoutId", "order");

-- AddForeignKey
ALTER TABLE "CoachProfile" ADD CONSTRAINT "CoachProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeProfile" ADD CONSTRAINT "TraineeProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
