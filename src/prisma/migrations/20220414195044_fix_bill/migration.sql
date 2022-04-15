/*
  Warnings:

  - Added the required column `coachId` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "coachId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
