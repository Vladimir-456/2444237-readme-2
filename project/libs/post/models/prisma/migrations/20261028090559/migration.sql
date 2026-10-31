-- AddForeignKey
ALTER TABLE "PostMailingItem" ADD CONSTRAINT "PostMailingItem_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
