/*
  Warnings:

  - The primary key for the `ChatRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ChatRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("roomId");
