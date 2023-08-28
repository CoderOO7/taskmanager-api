import createHttpError from "http-errors";
import { TASK_NOT_FOUND } from "../constants/errors";

export class TaskService {
  private taskRepository;

  constructor({ taskRepository }) {
    this.taskRepository = taskRepository;
  }

  createTask = async (data, userId) => {
    const { title, description } = data;
    const task = await this.taskRepository.save({
      title,
      description,
      created_by: userId,
      updated_by: userId,
      userId,
    });
    return task;
  };

  updateTaskById = async (id: string, data: any) => {
    const task = await this.taskRepository.update({ id }, data);
    if (!task.affected) {
      throw createHttpError.NotFound(TASK_NOT_FOUND);
    }
    return await this.taskRepository.findOneBy({ id });
  };

  deleteTaskById = async (id: string) => {
    const task = await this.taskRepository.delete({ id });
    if (!task.affected) {
      throw createHttpError.NotFound(TASK_NOT_FOUND);
    }
    return task;
  };

  getTaskById = async (id: string) => {
    const user = await this.taskRepository.findOneBy({ id });
    if (!user) {
      throw createHttpError.NotFound(TASK_NOT_FOUND);
    }
    return user;
  };

  getAllTasks = async () => {
    const tasks = await this.taskRepository.find();
    return tasks;
  };
}
