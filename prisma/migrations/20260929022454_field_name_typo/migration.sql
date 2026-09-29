/*
  Warnings:

  - You are about to drop the column `staatus` on the `WatchListItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchListItem" DROP COLUMN "staatus",
ADD COLUMN     "status" "WatchlistStatus" NOT NULL DEFAULT 'PLANNED';
