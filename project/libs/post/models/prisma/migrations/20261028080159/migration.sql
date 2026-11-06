/*
  Warnings:

  - You are about to drop the `DigestState` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PostMailingStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'COMPLETED', 'CANCELLED');

-- DropTable
DROP TABLE "DigestState";

-- CreateTable
CREATE TABLE "PostMailing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "PostMailingStatus" NOT NULL DEFAULT 'DRAFT',
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "PostMailing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostMailingItem" (
    "id" TEXT NOT NULL,
    "mailingId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostMailingItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostMailingItem_mailingId_position_idx" ON "PostMailingItem"("mailingId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "PostMailingItem_mailingId_postId_key" ON "PostMailingItem"("mailingId", "postId");

-- AddForeignKey
ALTER TABLE "PostMailingItem" ADD CONSTRAINT "PostMailingItem_mailingId_fkey" FOREIGN KEY ("mailingId") REFERENCES "PostMailing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
