/*
  Warnings:

  - You are about to drop the `provide_profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "provide_profile" DROP CONSTRAINT "provide_profile_provider_id_fkey";

-- DropTable
DROP TABLE "provide_profile";

-- CreateTable
CREATE TABLE "provider_profile" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "restaurant_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_profile_provider_id_key" ON "provider_profile"("provider_id");

-- AddForeignKey
ALTER TABLE "provider_profile" ADD CONSTRAINT "provider_profile_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
