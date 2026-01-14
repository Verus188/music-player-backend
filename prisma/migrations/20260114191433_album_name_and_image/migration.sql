/*
  Warnings:

  - You are about to drop the column `albumImageUrl` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `apiAudioUrl` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Track` table. All the data in the column will be lost.
  - Added the required column `albumImage` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumName` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audio` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "albumImageUrl",
DROP COLUMN "apiAudioUrl",
DROP COLUMN "fileUrl",
ADD COLUMN     "albumImage" TEXT NOT NULL,
ADD COLUMN     "albumName" TEXT NOT NULL,
ADD COLUMN     "audio" TEXT NOT NULL;
