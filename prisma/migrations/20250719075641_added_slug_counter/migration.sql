/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Link` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `TestEntry` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `linkId` on the `Visit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_linkId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "linkId",
ADD COLUMN     "linkId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TestEntry";

-- CreateTable
CREATE TABLE "SlugCounter" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "SlugCounter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
