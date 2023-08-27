import type { FastifyInstance } from "fastify";
import { IAppContainer } from "../../../interfaces/container.interface";
import { UserController } from "../../../controllers";

const usersRoutes = async (
  fastify: FastifyInstance,
  container: IAppContainer
) => {
  const userController = new UserController(container);

  fastify.get(
    "/users",
    { preValidation: [fastify.authenticate] },
    userController.getAllUsers
  );

  fastify.get(
    "/users/me",
    { preValidation: [fastify.authenticate] },
    userController.getLoggedInUser
  );

  fastify.post(
    "/users",
    { preValidation: [fastify.authenticate] },
    userController.createUser
  );

  fastify.get(
    "/users/:id",
    { preValidation: [fastify.authenticate] },
    userController.getUser
  );

  fastify.delete(
    "/users/:id",
    { preValidation: [fastify.authenticate] },
    userController.deleteUser
  );

  fastify.patch(
    "/users/:id",
    { preValidation: [fastify.authenticate] },
    userController.updateUser
  );
};

export { usersRoutes };
