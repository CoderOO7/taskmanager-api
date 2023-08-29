import { JWT } from "@fastify/jwt";
import { AwilixContainer } from "awilix";

declare module "fastify" {
  interface FastifyRequest {
    container: AwilixContainer;
    jwtVerify(options: any): Promise<any>;
  }

  interface FastifyInstance {
    authenticate(request, reply): any;
    jwt: JWT;
    swagger:any;
  }
}
