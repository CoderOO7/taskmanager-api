import type { FastifyInstance, FastifyReply } from "fastify";
import { fromEnv } from "../utils";
import { fastifyPlugin } from "fastify-plugin";

const authPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.register(require("@fastify/jwt"), {
    secret: fromEnv("JWT_SECRET"),
    messages: {
      badRequestErrorMessage: "Format is Authorization: Bearer [token]",
      noAuthorizationInHeaderMessage: "Autorization header is missing!",
      authorizationTokenExpiredMessage: "Authorization token expired",
      authorizationTokenInvalid: (err: any) => {
        return `Authorization token is invalid: ${err.message}`;
      },
    },
  });

  fastify.decorate("authenticate", async (request: any , reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err: any) {
      reply.code(401).send({ error: 'Unauthorized' });
      reply.send(err);
    }
  });
});

export { authPlugin };
