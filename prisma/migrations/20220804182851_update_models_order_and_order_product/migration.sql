/*
  Warnings:

  - Added the required column `flavor` to the `orderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderProducts" ADD COLUMN     "flavor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "themeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pictures" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
