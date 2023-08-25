import { fastify } from "fastify";
import type {
  FastifyInstance,
  FastifyListenOptions,
} from "fastify";
import { fastifyPostgres } from "@fastify/postgres";

const fastifyInstance: FastifyInstance = fastify({ logger: true });

/**
 * Routes
 */
const routes = require("./routes");

/**
 * Extract environment variables
 */
const PORT: number = Number(process.env.PORT) || 3000;
const HOSTNAME: string = process.env.HOST || "0.0.0.0";
const POSTGRES_USER: string = process.env.POSTGRES_USER || "admin";
const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD || "admin";
const POSTGRES_SERVICE: string = process.env.POSTGRES_SERVICE || "";
const POSTGRES_PORT: number = Number(process.env.POSTGRES_DB);
const POSTGRES_DB: string = process.env.POSTGRES_DB || "taskmanager";

/**
 * Connect to DB
 */
fastifyInstance.register(fastifyPostgres, {
  connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_SERVICE}:${POSTGRES_PORT}/${POSTGRES_DB}`,
});

/**
 * Register routes
 */
fastifyInstance.register(routes);

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
