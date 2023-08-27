import type {
  FastifyInstance,
} from "fastify";
import { usersRoutes } from "./users/index";
import { IFastifyRegisterOptions } from "../../interfaces/fastify.interface";
import { authRoutes } from "./auth";

const v1ApiRoutes = async (
  fastify: FastifyInstance,
  options: IFastifyRegisterOptions
) => {
  fastify.register(require("./testApi"));
  fastify.register(usersRoutes, options.container);
  fastify.register(authRoutes, options.container);
};

export { v1ApiRoutes };
