/*
  Warnings:

  - You are about to drop the `SlugCounter` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "slug" DROP NOT NULL;

-- DropTable
DROP TABLE "SlugCounter";
