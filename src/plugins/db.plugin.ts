import "reflect-metadata";
import { fastifyPlugin } from "fastify-plugin";
import { AppDataSource } from "../config/typeorm/data-source";
import { FastifyInstance } from "fastify";

const dbPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  try {
    const dbConnection:any = await AppDataSource.initialize();
    fastify.log.info(`Database listening at ${dbConnection.options.host}:${dbConnection.options.port}`)
  } catch (err) {
    fastify.log.error(`dbConnection Error ${err}`);
  }
});

export { dbPlugin };
