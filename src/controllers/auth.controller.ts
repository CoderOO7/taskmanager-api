import { FastifyReply, FastifyRequest } from "fastify";
import { ServicesNames } from "../enums";
import { IAppContainer } from "../interfaces/container.interface";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;
  
  constructor(container: IAppContainer) {
    this.authService = container.resolve(ServicesNames.authService);
  }

  registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const newUser = await this.authService.registerUser(req.body);
    return reply.code(200).send(newUser);
  };

  loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const updatedUser = await this.authService.loginUser(req.body);
    return reply.code(200).send(updatedUser);
  };
}
