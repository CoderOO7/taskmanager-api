import { FastifyReply, FastifyRequest } from "fastify";
import { JWT } from "@fastify/jwt";
import { ServicesNames } from "../enums";
import { TaskService } from "../services";
import { IAppContainer } from "../interfaces/container.interface";

export class TaskController {
  private taskService: TaskService;

  constructor(container: IAppContainer) {
    this.taskService = container.resolve(ServicesNames.taskService);
  }

  createTask = async (req: FastifyRequest, reply: FastifyReply) => {
    const { user }: any = req;
    const newUser = await this.taskService.createTask(req.body, user.userId);
    return reply.code(201).send(newUser);
  };

  updateTaskById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = req.params;
    const data: any = req.body;
    const updatedUser = await this.taskService.updateTaskById(id, data);
    return reply.code(200).send(updatedUser);
  };

  deleteTaskById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = req.params;
    await this.taskService.deleteTaskById(id);
    return reply.code(204).send();
  };

  getTaskByUserId = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = req.params;
    const newUser = await this.taskService.getTaskById(id);
    return reply.code(200).send(newUser);
  };

  getAllTasks = async (req: FastifyRequest, reply: FastifyReply) => {
    const tasks = await this.taskService.getAllTasks();
    return reply.code(200).send(tasks);
  };
}
