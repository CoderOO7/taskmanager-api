import type { FastifyInstance } from "fastify";
import {v1ApiRoutes} from './v1';
import { IAppContainer } from "../interfaces/container.interface";

const registerRoutes = async (fastify: FastifyInstance, container: IAppContainer) => {
  fastify.register(v1ApiRoutes, { prefix: "/api/v1", container });
};

export { registerRoutes };
