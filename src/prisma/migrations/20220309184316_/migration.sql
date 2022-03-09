/*
  Warnings:

  - The primary key for the `CoachReviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProgramPackageReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,coachId]` on the table `CoachReviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,programPackageId]` on the table `ProgramPackageReview` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `CoachReviews` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ProgramPackageReview` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CoachReviews" DROP CONSTRAINT "CoachReviews_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CoachReviews_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProgramPackageReview" DROP CONSTRAINT "ProgramPackageReview_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ProgramPackageReview_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CoachReviews_userId_coachId_key" ON "CoachReviews"("userId", "coachId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramPackageReview_userId_programPackageId_key" ON "ProgramPackageReview"("userId", "programPackageId");
