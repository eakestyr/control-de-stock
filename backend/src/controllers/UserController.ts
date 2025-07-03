import { Request, Response } from "express";
import { UserService } from "../services/user/UserService";
import { CreateUserDTO } from "../dtos/user.dto";
import { LoginUserDTO } from "../dtos/auth.dto";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body as CreateUserDTO;

    try {
      const user = await userService.createUser({ name, email, password });
      res
        .status(201)
        .json({ status: 201, message: "Usuário cadastrado com sucesso!" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body as LoginUserDTO;

    try {
      const user = await userService.loginUser({ email, password });
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
