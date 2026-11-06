/*
  Warnings:

  - You are about to drop the `PostMailing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostMailingToPostMailingItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_mailings` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PostMailingStatus" ADD VALUE 'PENDING';
ALTER TYPE "PostMailingStatus" ADD VALUE 'SENT';
ALTER TYPE "PostMailingStatus" ADD VALUE 'FAILED';

-- DropForeignKey
ALTER TABLE "_PostMailingToPostMailingItem" DROP CONSTRAINT "_PostMailingToPostMailingItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostMailingToPostMailingItem" DROP CONSTRAINT "_PostMailingToPostMailingItem_B_fkey";

-- DropForeignKey
ALTER TABLE "post_mailings" DROP CONSTRAINT "post_mailings_digestId_fkey";

-- DropTable
DROP TABLE "PostMailing";

-- DropTable
DROP TABLE "_PostMailingToPostMailingItem";

-- DropTable
DROP TABLE "post_mailings";

-- CreateTable
CREATE TABLE "post_mailing" (
    "id" TEXT NOT NULL,
    "digestId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "PostMailingStatus" NOT NULL DEFAULT 'PENDING',
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "post_mailing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_mailing_items" (
    "id" TEXT NOT NULL,
    "mailingId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "post_mailing_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DigestToPostMailingItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DigestToPostMailingItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "post_mailing_items_mailingId_position_idx" ON "post_mailing_items"("mailingId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "post_mailing_items_mailingId_postId_key" ON "post_mailing_items"("mailingId", "postId");

-- CreateIndex
CREATE INDEX "_DigestToPostMailingItem_B_index" ON "_DigestToPostMailingItem"("B");

-- AddForeignKey
ALTER TABLE "post_mailing" ADD CONSTRAINT "post_mailing_digestId_fkey" FOREIGN KEY ("digestId") REFERENCES "digest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_mailing_items" ADD CONSTRAINT "post_mailing_items_mailingId_fkey" FOREIGN KEY ("mailingId") REFERENCES "post_mailing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_mailing_items" ADD CONSTRAINT "post_mailing_items_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DigestToPostMailingItem" ADD CONSTRAINT "_DigestToPostMailingItem_A_fkey" FOREIGN KEY ("A") REFERENCES "digest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DigestToPostMailingItem" ADD CONSTRAINT "_DigestToPostMailingItem_B_fkey" FOREIGN KEY ("B") REFERENCES "post_mailing_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
