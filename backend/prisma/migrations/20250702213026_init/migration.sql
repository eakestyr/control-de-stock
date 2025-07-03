/*
  Warnings:

  - Added the required column `fornecedor` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Produto` ADD COLUMN `fornecedor` VARCHAR(191) NOT NULL;
