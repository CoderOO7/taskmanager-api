import 'reflect-metadata';
import { fastify } from "fastify";
import type { FastifyInstance, FastifyListenOptions } from "fastify";

import { registerRoutes } from "./routes";
import { registerPlugins } from "./plugins";
import { configureContainer } from "./container";
import { addHooks } from "./hooks";

const fastifyInstance: FastifyInstance = fastify({ logger: true });


/**
 * Extract environment variables
 */
const PORT: number = Number(process.env.API_PORT) || 3000;
const HOSTNAME: string = process.env.API_HOST || "0.0.0.0";

// Initialize the IoC container
const container = configureContainer();

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
export const start = () => {
  const options: FastifyListenOptions = { host: HOSTNAME, port: PORT };
  fastifyInstance.listen(options, (err: any) => {
    if (err) {
      fastifyInstance.log.error(err);
      process.exit(1);
    }
  });
};
