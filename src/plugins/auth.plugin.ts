import type {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { fromEnv } from "../utils";
import { fastifyPlugin } from "fastify-plugin";

const authPluginCB: FastifyPluginCallback = async function (fastify) {
  fastify.register(require("@fastify/jwt"), {
    secret: fromEnv("JWT_SECRET"),
    messages: {
      badRequestErrorMessage: "Format is Authorization: Bearer [token]",
      noAuthorizationInHeaderMessage: "Autorization header is missing!",
      authorizationTokenExpiredMessage: "Authorization token expired",
      authorizationTokenInvalid: (err) => {
        return `Authorization token is invalid: ${err.message}`;
      },
    },
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err: any) {
        reply.send(err);
      }
    }
  );

  return;
};

const authPlugin = fastifyPlugin(authPluginCB);
export { authPlugin };
