/*
  Warnings:

  - The primary key for the `CoachReviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CoachReviews` table. All the data in the column will be lost.
  - The primary key for the `ProgramPackageReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProgramPackageReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoachReviews" DROP CONSTRAINT "CoachReviews_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CoachReviews_pkey" PRIMARY KEY ("userId", "coachId");

-- AlterTable
ALTER TABLE "ProgramPackageReview" DROP CONSTRAINT "ProgramPackageReview_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProgramPackageReview_pkey" PRIMARY KEY ("userId", "programPackageId");
