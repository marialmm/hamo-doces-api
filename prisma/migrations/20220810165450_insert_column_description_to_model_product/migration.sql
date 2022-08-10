-- AlterTable
ALTER TABLE "orderProducts" ALTER COLUMN "flavor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "description" TEXT;
