import type { FastifyInstance } from "fastify";
import { IAppContainer } from "../../../interfaces/container.interface";
import { TaskController } from "../../../controllers";
import {
  createSchema,
  deleteSchema,
  getAllSchema,
  getSchema,
  updateSchema,
} from "./schema";
import { validatorCompiler } from "../../../validators/ajv";

const tasksRoutes = async (
  fastify: FastifyInstance,
  container: IAppContainer
) => {
  const taskController = new TaskController(container);

  fastify.get(
    "/tasks",
    {
      schema: getAllSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    taskController.getAllTasks
  );

  fastify.get(
    "/tasks/:id",
    {
      schema: getSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    taskController.getTaskByUserId
  );

  fastify.post(
    "/tasks",
    {
      schema: createSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    taskController.createTask
  );

  fastify.patch(
    "/tasks/:id",
    {
      schema: updateSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    taskController.updateTaskById
  );

  fastify.delete(
    "/tasks/:id",
    {
      schema: deleteSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    taskController.deleteTaskById
  );
};

export { tasksRoutes };
