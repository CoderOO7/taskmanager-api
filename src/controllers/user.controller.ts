import { FastifyReply, FastifyRequest } from "fastify";
import { ServicesNames } from "../enums";
import { IAppContainer } from "../interfaces/container.interface";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;
  constructor(container: IAppContainer) {
    this.userService = container.resolve(ServicesNames.userService);
  }

  createUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password }: any = req.body;
    const newUser = await this.userService.createUser(name, email, password);
    return reply.code(201).send(newUser);
  };

  updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = req.params;
    const data: any = req.body;
    const updatedUser = await this.userService.updateUser(id, data);
    return reply.code(200).send(updatedUser);
  };

  deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = req.params;
    await this.userService.deleteUser(id);
    return reply.code(204).send();
  };

  getUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = req.params;
    const newUser = await this.userService.getUser(id);
    return reply.code(200).send(newUser);
  };

  getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    const users = await this.userService.getAllUsers();
    return reply.code(200).send(users);
  };

  getLoggedInUser = (req: FastifyRequest, reply: FastifyReply) => {
    const { user }: any = req;
    const newUser = this.userService.getLoggedInUser(user.userId);
    return newUser;
  };
}
