-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('VIDEO', 'TEXT', 'PHOTO', 'QUOTE', 'LINK');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PUBLISHED', 'DRAFT');

-- CreateEnum
CREATE TYPE "PostMailingStatus" AS ENUM ('DRAFT', 'PENDING', 'PUBLISHED', 'SENT', 'FAILED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "tags" TEXT[],
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "isRepost" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "type_post" "PostType" NOT NULL DEFAULT 'TEXT',
    "title" TEXT,
    "url" TEXT,
    "preview" TEXT,
    "text" TEXT,
    "author" TEXT,
    "image_url" TEXT,
    "link" TEXT,
    "description" TEXT,
    "originalPostId" TEXT,
    "originalAuthorId" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "digest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "digest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "digest_post" (
    "id" TEXT NOT NULL,
    "digestId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "digest_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DigestToPostMailingItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DigestToPostMailingItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "likes_post_id_idx" ON "likes"("post_id");

-- CreateIndex
CREATE INDEX "likes_user_id_idx" ON "likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_post_id_user_id_key" ON "likes"("post_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_author_id_originalPostId_key" ON "posts"("author_id", "originalPostId");

-- CreateIndex
CREATE INDEX "post_mailing_items_mailingId_position_idx" ON "post_mailing_items"("mailingId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "post_mailing_items_mailingId_postId_key" ON "post_mailing_items"("mailingId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "digest_post_digestId_postId_key" ON "digest_post"("digestId", "postId");

-- CreateIndex
CREATE INDEX "_DigestToPostMailingItem_B_index" ON "_DigestToPostMailingItem"("B");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_mailing" ADD CONSTRAINT "post_mailing_digestId_fkey" FOREIGN KEY ("digestId") REFERENCES "digest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_mailing_items" ADD CONSTRAINT "post_mailing_items_mailingId_fkey" FOREIGN KEY ("mailingId") REFERENCES "post_mailing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_mailing_items" ADD CONSTRAINT "post_mailing_items_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "digest_post" ADD CONSTRAINT "digest_post_digestId_fkey" FOREIGN KEY ("digestId") REFERENCES "digest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "digest_post" ADD CONSTRAINT "digest_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DigestToPostMailingItem" ADD CONSTRAINT "_DigestToPostMailingItem_A_fkey" FOREIGN KEY ("A") REFERENCES "digest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DigestToPostMailingItem" ADD CONSTRAINT "_DigestToPostMailingItem_B_fkey" FOREIGN KEY ("B") REFERENCES "post_mailing_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
