"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () { return prisma.product.findMany(); });
    }
    getById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield prisma.product.findUnique({
                where: { id: data.id }
            });
            if (!existingProduct) {
                throw new Error("Este produto não foi encontrado no sistema.");
            }
            return existingProduct;
        });
    }
    getMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield prisma.product.findMany({
                where: {
                    nome: { contains: data }
                }
            });
            if (!existingProduct || existingProduct.length < 1) {
                throw new Error("Produtos não foram encontrados com essa palavra! (" + data + ")");
            }
            return existingProduct;
        });
    }
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield prisma.product.findUnique({
                where: { lote: data.lote },
            });
            if (existingProduct) {
                throw new Error("Um produto com este lote já está cadastrado.");
            }
            return prisma.product.create({ data });
        });
    }
    updateProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield prisma.product.findUnique({ where: { lote: data.lote } });
            if (!existingProduct) {
                throw new Error("Produto não encontrado no sistema.");
            }
            const updateData = {};
            if (data.nome !== undefined)
                updateData.nome = data.nome;
            if (data.preco !== undefined)
                updateData.preco = data.preco;
            if (data.validade !== undefined)
                updateData.validade = data.validade;
            if (data.quantidade !== undefined)
                updateData.quantidade = data.quantidade;
            if (data.localizacao !== undefined)
                updateData.localizacao = data.localizacao;
            if (data.fornecedor !== undefined)
                updateData.fornecedor = data.fornecedor;
            return prisma.product.update({
                where: { lote: data.lote },
                data: updateData
            });
        });
    }
    excludeProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield prisma.product.findUnique({
                where: { id: data.id },
            });
            if (!existingProduct) {
                throw new Error("Produto não encontrado no sistema.");
            }
            return prisma.product.delete({ where: { id: data.id } });
        });
    }
}
exports.ProductService = ProductService;
