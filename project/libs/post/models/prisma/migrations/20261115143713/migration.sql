/*
  Warnings:

  - A unique constraint covering the columns `[originalPostId]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "originalAuthorId" TEXT,
ADD COLUMN     "originalPostId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "posts_originalPostId_key" ON "posts"("originalPostId");
