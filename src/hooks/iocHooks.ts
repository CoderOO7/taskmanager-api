import type { FastifyInstance, FastifyRequest } from "fastify";
import { IAppContainer } from "../interfaces/container.interface";

export const setupIoCHooks = (app: FastifyInstance, container: IAppContainer) => {
  app.addHook("onRequest", (request: FastifyRequest, reply, done) => {
    request.container = container.createScope(); // Create a new scope for each request
    done();
  });
}
