/*
  Warnings:

  - The values [published,draft] on the enum `PostStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [video,text,photo,quote,link] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostStatus_new" AS ENUM ('PUBLISHED', 'DRAFT');
ALTER TABLE "public"."posts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "posts" ALTER COLUMN "status" TYPE "PostStatus_new" USING ("status"::text::"PostStatus_new");
ALTER TYPE "PostStatus" RENAME TO "PostStatus_old";
ALTER TYPE "PostStatus_new" RENAME TO "PostStatus";
DROP TYPE "public"."PostStatus_old";
ALTER TABLE "posts" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('VIDEO', 'TEXT', 'PHOTO', 'QUOTE', 'LINK');
ALTER TABLE "public"."posts" ALTER COLUMN "type_post" DROP DEFAULT;
ALTER TABLE "posts" ALTER COLUMN "type_post" TYPE "PostType_new" USING ("type_post"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "public"."PostType_old";
ALTER TABLE "posts" ALTER COLUMN "type_post" SET DEFAULT 'TEXT';
COMMIT;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ALTER COLUMN "type_post" SET DEFAULT 'TEXT';
