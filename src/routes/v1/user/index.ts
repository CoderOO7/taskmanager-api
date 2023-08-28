import type { FastifyInstance } from "fastify";
import { IAppContainer } from "../../../interfaces/container.interface";
import { UserController } from "../../../controllers";
import {
  createSchema,
  deleteSchema,
  getAllSchema,
  getSchema,
  updateSchema,
} from "./schema";
import { validatorCompiler } from "../../../validators/ajv";

const usersRoutes = async (
  fastify: FastifyInstance,
  container: IAppContainer
) => {
  const userController = new UserController(container);

  fastify.get(
    "/users",
    {
      schema: getAllSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    userController.getAllUsers
  );

  fastify.get(
    "/users/me",
    {
      schema: getSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    userController.getLoggedInUser
  );

  fastify.get(
    "/users/:id",
    {
      schema: getSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    userController.getUser
  );

  fastify.post(
    "/users",
    {
      schema: createSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    userController.createUser
  );

  fastify.patch(
    "/users/:id",
    {
      schema: updateSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    userController.updateUser
  );

  fastify.delete(
    "/users/:id",
    {
      schema: deleteSchema,
      validatorCompiler,
      preValidation: [fastify.authenticate],
    },
    userController.deleteUser
  );
};

export { usersRoutes };
