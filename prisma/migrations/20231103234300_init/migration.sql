-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imageLinks" TEXT[];
