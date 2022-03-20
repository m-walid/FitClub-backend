-- DropForeignKey
ALTER TABLE "DayExercise" DROP CONSTRAINT "DayExercise_dayId_fkey";

-- DropForeignKey
ALTER TABLE "DayExercise" DROP CONSTRAINT "DayExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramDay" DROP CONSTRAINT "ProgramDay_weekId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramWeek" DROP CONSTRAINT "ProgramWeek_programId_fkey";

-- DropIndex
DROP INDEX "Exercise_coachId_key";

-- DropIndex
DROP INDEX "Program_coachId_key";

-- AddForeignKey
ALTER TABLE "ProgramWeek" ADD CONSTRAINT "ProgramWeek_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramDay" ADD CONSTRAINT "ProgramDay_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "ProgramWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayExercise" ADD CONSTRAINT "DayExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayExercise" ADD CONSTRAINT "DayExercise_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "ProgramDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
