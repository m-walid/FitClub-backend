-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "averageRate" INTEGER;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "averageRate" INTEGER,
ADD COLUMN     "reviewsCount" INTEGER;
