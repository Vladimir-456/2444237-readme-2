/*
  Warnings:

  - You are about to drop the `PostMailingItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostMailingItem" DROP CONSTRAINT "PostMailingItem_mailingId_fkey";

-- DropForeignKey
ALTER TABLE "PostMailingItem" DROP CONSTRAINT "PostMailingItem_postId_fkey";

-- DropTable
DROP TABLE "PostMailingItem";

-- CreateTable
CREATE TABLE "post_mailings" (
    "id" TEXT NOT NULL,
    "digestId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "post_mailings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostMailingToPostMailingItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostMailingToPostMailingItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostMailingToPostMailingItem_B_index" ON "_PostMailingToPostMailingItem"("B");

-- AddForeignKey
ALTER TABLE "post_mailings" ADD CONSTRAINT "post_mailings_digestId_fkey" FOREIGN KEY ("digestId") REFERENCES "digest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostMailingToPostMailingItem" ADD CONSTRAINT "_PostMailingToPostMailingItem_A_fkey" FOREIGN KEY ("A") REFERENCES "PostMailing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostMailingToPostMailingItem" ADD CONSTRAINT "_PostMailingToPostMailingItem_B_fkey" FOREIGN KEY ("B") REFERENCES "post_mailings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
