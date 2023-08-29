import { FastifyInstance } from "fastify";
import { ApiTags } from "../enums";

const swaggerConfig = {
  hideUntagged: false,
  exposeRoute: true,
  swagger: {
    info: {
      title: "Task Manager API",
      description: "API documentation for Task Manager",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    exposeRoutes: true,
    tags: [
      { name: ApiTags.auth, description: "Authorization related end-points" },
      { name: ApiTags.user, description: "User related end-points" },
      { name: ApiTags.task, description: "Task related end-points" },
      { name: ApiTags.default, description: "Default end-points" },
    ],
    security: [{ bearerAuth: [] }],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: `Copy the authorization token from Auth api. And add Bearer prefix in below format:
          Bearer \${token}
        `,
      },
    },
  },
};

const swaggerUIConfig = {
  routePrefix: "/",
  uiConfig: {
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
};

export const registerSwagger = async (fastify: FastifyInstance) => {
  await fastify.register(require("@fastify/swagger"), swaggerConfig);
  await fastify.register(require("@fastify/swagger-ui"), swaggerUIConfig);
};
