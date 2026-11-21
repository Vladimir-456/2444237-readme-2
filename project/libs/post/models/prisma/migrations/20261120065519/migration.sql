/*
  Warnings:

  - You are about to drop the `_DigestToPostMailingItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `digest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `digest_post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_mailing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_mailing_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DigestToPostMailingItem" DROP CONSTRAINT "_DigestToPostMailingItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_DigestToPostMailingItem" DROP CONSTRAINT "_DigestToPostMailingItem_B_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "digest_post" DROP CONSTRAINT "digest_post_digestId_fkey";

-- DropForeignKey
ALTER TABLE "digest_post" DROP CONSTRAINT "digest_post_postId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_mailing" DROP CONSTRAINT "post_mailing_digestId_fkey";

-- DropForeignKey
ALTER TABLE "post_mailing_items" DROP CONSTRAINT "post_mailing_items_mailingId_fkey";

-- DropForeignKey
ALTER TABLE "post_mailing_items" DROP CONSTRAINT "post_mailing_items_postId_fkey";

-- DropTable
DROP TABLE "_DigestToPostMailingItem";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "digest";

-- DropTable
DROP TABLE "digest_post";

-- DropTable
DROP TABLE "likes";

-- DropTable
DROP TABLE "post_mailing";

-- DropTable
DROP TABLE "post_mailing_items";

-- DropTable
DROP TABLE "posts";

-- DropEnum
DROP TYPE "PostMailingStatus";

-- DropEnum
DROP TYPE "PostStatus";

-- DropEnum
DROP TYPE "PostType";
