import { PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/user.dto";
import bcrypt from "bcrypt";
import { LoginUserDTO } from "../../dtos/auth.dto";

const prisma = new PrismaClient();

export class UserService {
  async createUser(data: CreateUserDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error("Email já está em uso!");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async loginUser(data: LoginUserDTO) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
