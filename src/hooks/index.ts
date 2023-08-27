import type { FastifyInstance } from "fastify";
import { IAppContainer } from "../interfaces/container.interface";
import { setupIoCHooks } from "./iocHooks";

const addHooks = async (fastify: FastifyInstance, container: IAppContainer) => {
    setupIoCHooks(fastify,container);
};

export { addHooks };
