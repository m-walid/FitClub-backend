/*
  Warnings:

  - You are about to drop the column `workoutsNo` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_coachId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercises" DROP CONSTRAINT "WorkoutExercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercises" DROP CONSTRAINT "WorkoutExercises_workoutId_fkey";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "workoutsNo";

-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "workoutId";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "WorkoutExercises";

-- CreateTable
CREATE TABLE "ProgramWeek" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ProgramWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramDay" (
    "id" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ProgramDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayExercise" (
    "dayId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "reps" INTEGER,
    "sets" INTEGER,
    "duration" INTEGER,

    CONSTRAINT "DayExercise_pkey" PRIMARY KEY ("dayId","exerciseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramWeek_programId_order_key" ON "ProgramWeek"("programId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramDay_weekId_order_key" ON "ProgramDay"("weekId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "DayExercise_dayId_order_key" ON "DayExercise"("dayId", "order");

-- AddForeignKey
ALTER TABLE "ProgramWeek" ADD CONSTRAINT "ProgramWeek_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDay" ADD CONSTRAINT "ProgramDay_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "ProgramWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayExercise" ADD CONSTRAINT "DayExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayExercise" ADD CONSTRAINT "DayExercise_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "ProgramDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
