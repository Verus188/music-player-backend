/*
  Warnings:

  - A unique constraint covering the columns `[apiUrl]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Made the column `apiUrl` on table `Track` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "apiUrl" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track_apiUrl_key" ON "Track"("apiUrl");
