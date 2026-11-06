/*
  Warnings:

  - Added the required column `digestId` to the `PostMailing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostMailing" ADD COLUMN     "digestId" TEXT NOT NULL,
ADD COLUMN     "sentAt" TIMESTAMP(3);
