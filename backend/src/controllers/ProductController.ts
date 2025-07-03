import { Request, Response } from "express";
import { ProductService } from "../services/product/ProductService";
import { CreateProductDTO } from "../dtos/product.dto";

const productService = new ProductService();

export class ProductController {
  async findAll(req: Request, res: Response) {
    try {
      const product = await productService.getAll();
      res.status(200).json({ status: 200, data: product });
    } catch (error: any) {
      res.status(404).json({ status: 404, message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    try {
      const product = await productService.getById({ id });
      res.status(200).json({ status: 200, data: product });
    } catch (error: any) {
      res.status(404).json({ status: 404, message: error.message });
    }
  }

  async findMany(req: Request, res: Response): Promise<void> {
    const term = req.params.term;

    try {
      const product = await productService.getMany(term);
      res.status(200).json({ status: 200, data: product });
    } catch (error: any) {
      res.status(404).json({ status: 404, message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    const { nome, preco, lote, validade, quantidade, localizacao, fornecedor } =
      req.body as CreateProductDTO;

    try {
      const product = await productService.createProduct({
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
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { nome, preco, lote, validade, quantidade, localizacao, fornecedor } =
      req.body as CreateProductDTO;

    try {
      const product = await productService.updateProduct({
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
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async exclude(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const product = await productService.excludeProduct({ id });
      res
        .status(200)
        .json({ status: 200, message: "Produto removido com sucesso!" });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
