import { PrismaClient } from "@prisma/client";
import {
  CreateProductDTO,
  PickIdDTO,
  PickLoteDTO,
} from "../../dtos/product.dto";

const prisma = new PrismaClient();

export class ProductService {
  async getAll() {
    return prisma.product.findMany();
  }

  async getById(data: PickIdDTO) {
    const existingProduct = await prisma.product.findUnique({
      where: { id: data.id },
    });

    if (!existingProduct) {
      throw new Error("Este produto não foi encontrado no sistema.");
    }

    return existingProduct;
  }

  async getMany(data: string) {
    const existingProduct = await prisma.product.findMany({
      where: {
        nome: { contains: data },
      },
    });

    if (!existingProduct || existingProduct.length < 1) {
      throw new Error(
        "Produtos não foram encontrados com essa palavra! (" + data + ")"
      );
    }

    return existingProduct;
  }

  async createProduct(data: CreateProductDTO) {
    const existingProduct = await prisma.product.findUnique({
      where: { lote: data.lote },
    });

    if (existingProduct) {
      throw new Error("Um produto com este lote já está cadastrado.");
    }

    return prisma.product.create({ data });
  }

  async updateProduct(data: Partial<CreateProductDTO> & { lote: string }) {
    const existingProduct = await prisma.product.findUnique({
      where: { lote: data.lote },
    });

    if (!existingProduct) {
      throw new Error("Produto não encontrado no sistema.");
    }

    const updateData: any = {};
    if (data.nome !== undefined) updateData.nome = data.nome;
    if (data.preco !== undefined) updateData.preco = data.preco;
    if (data.validade !== undefined) updateData.validade = data.validade;
    if (data.quantidade !== undefined) updateData.quantidade = data.quantidade;
    if (data.localizacao !== undefined)
      updateData.localizacao = data.localizacao;
    if (data.fornecedor !== undefined) updateData.fornecedor = data.fornecedor;

    return prisma.product.update({
      where: { lote: data.lote },
      data: updateData,
    });
  }

  async excludeProduct(data: PickIdDTO) {
    const existingProduct = await prisma.product.findUnique({
      where: { id: data.id },
    });

    if (!existingProduct) {
      throw new Error("Produto não encontrado no sistema.");
    }

    return prisma.product.delete({ where: { id: data.id } });
  }
}
