/*
  Warnings:

  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `meal_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerProfile_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "meal_id" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "providerProfile_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "order_items";

-- CreateIndex
CREATE INDEX "order_meal_id_idx" ON "order"("meal_id");

-- CreateIndex
CREATE INDEX "order_providerProfile_id_idx" ON "order"("providerProfile_id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_providerProfile_id_fkey" FOREIGN KEY ("providerProfile_id") REFERENCES "provider_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "food_meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
