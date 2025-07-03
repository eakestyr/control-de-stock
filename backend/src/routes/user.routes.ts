import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/api/v1/signup", (req, res) =>
  userController.create(req, res)
);

userRoutes.post("/api/v1/signin", (req, res) => userController.login(req, res));

export default userRoutes;
