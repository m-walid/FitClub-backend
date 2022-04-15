/*
  Warnings:

  - A unique constraint covering the columns `[programId]` on the table `ProgramRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ProgramRequestStatus" ADD VALUE 'Delivered';

-- AlterTable
ALTER TABLE "ProgramRequest" ADD COLUMN     "programId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProgramRequest_programId_key" ON "ProgramRequest"("programId");

-- AddForeignKey
ALTER TABLE "ProgramRequest" ADD CONSTRAINT "ProgramRequest_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
