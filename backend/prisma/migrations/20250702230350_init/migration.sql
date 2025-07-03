/*
  Warnings:

  - You are about to drop the `Produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Produto`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `lote` VARCHAR(191) NOT NULL,
    `validade` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_lote_key`(`lote`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
