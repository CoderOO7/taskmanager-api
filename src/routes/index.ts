import type { FastifyInstance } from "fastify";

const apiRoutes = async (fastify: FastifyInstance) => {
  fastify.register(require("./v1"), { prefix: "/api/v1" });
  fastify.get("/", async () => {
    return {
      message: "Fastify API is on fire",
    };
  });
};

module.exports = apiRoutes;
