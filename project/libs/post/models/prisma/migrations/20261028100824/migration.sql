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

-- CreateIndex
CREATE UNIQUE INDEX "digest_post_digestId_postId_key" ON "digest_post"("digestId", "postId");

-- AddForeignKey
ALTER TABLE "digest_post" ADD CONSTRAINT "digest_post_digestId_fkey" FOREIGN KEY ("digestId") REFERENCES "digest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "digest_post" ADD CONSTRAINT "digest_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
