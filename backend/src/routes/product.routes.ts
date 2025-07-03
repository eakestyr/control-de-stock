import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/api/v1/products", (req, res) =>
  productController.findAll(req, res)
);

productRoutes.get("/api/v1/products/:id", (req, res) =>
  productController.findById(req, res)
);

productRoutes.get("/api/v1/products/m/:term", (req, res) =>
  productController.findMany(req, res)
);

productRoutes.post("/api/v1/products", (req, res) =>
  productController.create(req, res)
);

productRoutes.delete("/api/v1/products/:id", (req, res) =>
  productController.exclude(req, res)
);

productRoutes.put("/api/v1/products/:id", (req, res) =>
  productController.update(req, res)
);

export default productRoutes;
