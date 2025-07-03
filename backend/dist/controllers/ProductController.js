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
exports.ProductController = void 0;
const ProductService_1 = require("../services/product/ProductService");
const productService = new ProductService_1.ProductService();
class ProductController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productService.getAll();
                res.status(200).json({ status: 200, data: product });
            }
            catch (error) {
                res.status(404).json({ status: 404, message: error.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }
            try {
                const product = yield productService.getById({ id });
                res.status(200).json({ status: 200, data: product });
            }
            catch (error) {
                res.status(404).json({ status: 404, message: error.message });
            }
        });
    }
    findMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const term = req.params.term;
            try {
                const product = yield productService.getMany(term);
                res.status(200).json({ status: 200, data: product });
            }
            catch (error) {
                res.status(404).json({ status: 404, message: error.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, preco, lote, validade, quantidade, localizacao, fornecedor } = req.body;
            try {
                const product = yield productService.createProduct({
                    nome,
                    preco,
                    lote,
                    validade,
                    quantidade,
                    localizacao,
                    fornecedor,
                });
                res
                    .status(201)
                    .json({ status: 201, message: "Produto cadastrado com sucesso!" });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, preco, lote, validade, quantidade, localizacao, fornecedor } = req.body;
            try {
                const product = yield productService.updateProduct({
                    nome,
                    preco,
                    lote,
                    validade,
                    quantidade,
                    localizacao,
                    fornecedor,
                });
                res
                    .status(200)
                    .json({ status: 200, message: "Produto modificado com sucesso!" });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    exclude(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const product = yield productService.excludeProduct({ id });
                res
                    .status(200)
                    .json({ status: 200, message: "Produto removido com sucesso!" });
            }
            catch (error) {
                res.status(404).json({ message: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
