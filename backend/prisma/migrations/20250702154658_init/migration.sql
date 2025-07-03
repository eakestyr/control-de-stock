/*
  Warnings:

  - A unique constraint covering the columns `[lote]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Produto_lote_key` ON `Produto`(`lote`);
