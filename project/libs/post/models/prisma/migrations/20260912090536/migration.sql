/*
  Warnings:

  - A unique constraint covering the columns `[post_id,user_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "likes_post_id_idx" ON "likes"("post_id");

-- CreateIndex
CREATE INDEX "likes_user_id_idx" ON "likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_post_id_user_id_key" ON "likes"("post_id", "user_id");
