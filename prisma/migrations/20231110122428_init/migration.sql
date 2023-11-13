/*
  Warnings:

  - Added the required column `leadImage` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectType` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "leadImage" TEXT NOT NULL,
ADD COLUMN     "projectType" TEXT NOT NULL;
