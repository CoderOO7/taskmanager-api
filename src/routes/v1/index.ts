import type { FastifyInstance } from "fastify";

const v1ApiRoutes = async (fastify: FastifyInstance) => {
  fastify.register(require("./testApi"));
};

export default v1ApiRoutes;
