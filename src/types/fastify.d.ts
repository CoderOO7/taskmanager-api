import { AwilixContainer } from "awilix";

declare module "fastify" {
  interface FastifyRequest {
    container: AwilixContainer;
    jwtVerify: () => any;
  }

  interface FastifyInstance {
    authenticate: (request, reply) => any
  }
}
