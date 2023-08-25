import type { FastifyInstance } from "fastify";

const testAPI = async (fastify: FastifyInstance) => {
  fastify.get("/testAPI", async () => {
    return {
      message: "API is working properly",
    };
  });
};

export default testAPI;