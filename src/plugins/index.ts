import type { FastifyInstance } from "fastify";
import { dbPlugin } from "./db.plugin";
import { authPlugin } from "./auth.plugin";

const registerPlugins = async (fastify: FastifyInstance) => {
  fastify.register(dbPlugin);
  fastify.register(authPlugin);
};

export { registerPlugins };
