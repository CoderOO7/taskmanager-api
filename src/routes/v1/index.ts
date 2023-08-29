import type { FastifyInstance } from "fastify";
import { usersRoutes } from "./user/index";
import { IFastifyRegisterOptions } from "../../interfaces/fastify.interface";
import { authRoutes } from "./auth";
import { tasksRoutes } from "./task";

const v1ApiRoutes = async (
  fastify: FastifyInstance,
  options: IFastifyRegisterOptions
) => {
  fastify.register(require("./testApi"));
  fastify.register(usersRoutes, options.container);
  fastify.register(authRoutes, options.container);
  fastify.register(tasksRoutes, options.container);
};

export { v1ApiRoutes };
