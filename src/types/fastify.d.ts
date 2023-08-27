import { AwilixContainer } from "awilix";

declare module "fastify" {
  interface FastifyRequest {
    container: AwilixContainer;
  }
}
