-- CreateTable
CREATE TABLE "DigestState" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "lastSentAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DigestState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DigestState_key_key" ON "DigestState"("key");
