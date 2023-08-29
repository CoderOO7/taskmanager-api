import { FastifyRegisterOptions } from "fastify";
import { IAppContainer } from "./container.interface";

interface IFastifyRegisterOptions extends FastifyRegisterOptions<any> {
  container?: IAppContainer;
}

export { IFastifyRegisterOptions };
