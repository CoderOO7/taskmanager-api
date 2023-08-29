import type { FastifyInstance } from "fastify";
import { IAppContainer } from "../../../interfaces/container.interface";
import { AuthController } from "../../../controllers/auth.controller";
import { registerSchema, loginSchema } from "./schema";
import { validatorCompiler } from "../../../validators/ajv";

const authRoutes = async (
  fastify: FastifyInstance,
  container: IAppContainer
) => {
  const userController = new AuthController(container, fastify.jwt);
  fastify.post(
    "/signup",
    { schema: registerSchema, validatorCompiler },
    userController.registerUser
  );

  fastify.post(
    "/login",
    { schema: loginSchema, validatorCompiler },
    userController.loginUser
  );  
};

export { authRoutes };
