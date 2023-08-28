import { FastifyReply, FastifyRequest } from "fastify";
import { ServicesNames } from "../enums";
import { IAppContainer } from "../interfaces/container.interface";
import { AuthService } from "../services/auth.service";
import { JWT } from "@fastify/jwt";

export class AuthController {
  private authService: AuthService;
  private jwt: JWT;
  
  constructor(container: IAppContainer, jwt: JWT) {
    this.authService = container.resolve(ServicesNames.authService);
    this.jwt = jwt;
  }

  registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const newUser = await this.authService.registerUser(req.body, this.jwt);
    return reply.code(201).send(newUser);
  };

  loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const updatedUser = await this.authService.loginUser(req.body, this.jwt);
    return reply.code(200).send(updatedUser);
  };
}
