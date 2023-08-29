import "reflect-metadata";
import { fastify } from "fastify";
import type { FastifyInstance, FastifyListenOptions } from "fastify";
import {fastifyCors} from "@fastify/cors";

import { registerRoutes } from "./routes";
import { registerPlugins } from "./plugins";
import { configureContainer } from "./container";
import { addHooks } from "./hooks";
import { registerSwagger } from "./config/swagger";

const fastifyInstance: FastifyInstance = fastify({ logger: true });

/**
 * Extract environment variables
 */
const PORT: number = Number(process.env.API_PORT) || 3000;
const HOSTNAME: string = process.env.API_HOST || "0.0.0.0";

// Initialize the IoC container
const container = configureContainer();

fastifyInstance.register(fastifyCors, { origin: "*" });

/**
 * Register Swagger for API Documentation
 */
registerSwagger(fastifyInstance);

/**
 * Register plugins
 */
registerPlugins(fastifyInstance);

/**
 * add hooks
 */
addHooks(fastifyInstance, container);

/**
 * Register routes
 */
registerRoutes(fastifyInstance, container);

/**
 * Start fastify server listener
 */
export const start = async () => {
  const options: FastifyListenOptions = { host: HOSTNAME, port: PORT };
  fastifyInstance.listen(options, (err: any) => {
    if (err) {
      fastifyInstance.log.error(err);
      process.exit(1);
    }
    fastifyInstance.swagger();
  });
};
