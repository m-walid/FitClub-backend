/*
  Warnings:

  - The values [LOSS,FIT] on the enum `Goal` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Goal_new" AS ENUM ('WeightLoss', 'StayFit', 'GainMuscles', 'GetStronger');
ALTER TABLE "TraineeProfile" ALTER COLUMN "goal" TYPE "Goal_new" USING ("goal"::text::"Goal_new");
ALTER TYPE "Goal" RENAME TO "Goal_old";
ALTER TYPE "Goal_new" RENAME TO "Goal";
DROP TYPE "Goal_old";
COMMIT;
