-- AlterTable
ALTER TABLE "user" ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';
