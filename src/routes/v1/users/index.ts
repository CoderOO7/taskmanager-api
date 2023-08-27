import { ContainerOptions } from "awilix";
import type { FastifyInstance } from "fastify";
// import { UserController } from "../../../controllers/user.controller";
import { IAppContainer } from "../../../interfaces/container.interface";
import { ServicesNames } from "../../../enums";
import { UserController } from "../../../controllers/user.controller";

// const { validateToken } = require("../utils/jwt");

const usersRoutes = async (fastify: FastifyInstance, container: IAppContainer) => {
  const userController = new UserController(container);

  fastify.get("/users",  userController.getAllUsers);

  fastify.get("/users/me", userController.getLoggedInUser);

  fastify.post("/users", userController.createUser);

  fastify.get("/users/:id", userController.getUser);

  fastify.delete("/users/:id", userController.deleteUser);

  fastify.patch("/users/:id", userController.updateUser);
};

export { usersRoutes };
