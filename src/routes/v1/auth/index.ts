import { ContainerOptions } from "awilix";
import type { FastifyInstance } from "fastify";
import { IAppContainer } from "../../../interfaces/container.interface";
import { AuthController } from "../../../controllers/auth.controller";


const authRoutes = async (
  fastify: FastifyInstance,
  container: IAppContainer
) => {
  const userController = new AuthController(container);

  fastify.post("/signup", userController.registerUser);
  fastify.post("/login", userController.loginUser);
};

export { authRoutes };
