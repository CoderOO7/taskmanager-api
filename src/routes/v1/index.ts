import type { FastifyInstance, FastifyPluginOptions, FastifyRegisterOptions } from "fastify";
import { usersRoutes } from "./users/index";
import { IFastifyRegisterOptions } from "../../interfaces/fastify.interface";

const v1ApiRoutes = async (fastify: FastifyInstance, options: IFastifyRegisterOptions) => {
  fastify.register(require("./testApi"));
  fastify.register(usersRoutes, options.container)
};

export { v1ApiRoutes };
