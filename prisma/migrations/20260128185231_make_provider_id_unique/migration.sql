/*
  Warnings:

  - A unique constraint covering the columns `[provider_id]` on the table `provide_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "provide_profile_provider_id_key" ON "provide_profile"("provider_id");
