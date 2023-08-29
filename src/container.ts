import { createContainer, asClass, asValue } from "awilix";
import { AuthService, TaskService, UserService } from "./services";
import { UserController, AuthController, TaskController } from "./controllers";
import { IAppContainer } from "./interfaces/container.interface";
import { ControllerNames, RepositoriesNames, ServicesNames } from "./enums";
import { AuthRepository, UserRepository } from "./repositories";
import { AppDataSource } from "./config/typeorm/data-source";
import { TaskEntity } from "./entities";

const configureContainer = () => {
  const container : IAppContainer = createContainer();
  
  // register services
  container.register({
    [ServicesNames.authService]: asClass(AuthService).scoped(),
    [ServicesNames.userService]: asClass(UserService).scoped(),
    [ServicesNames.taskService]: asClass(TaskService).scoped()
  });

  // register repositories
  container.register({
    [RepositoriesNames.userRepository]: asClass(UserRepository).scoped(),
    [RepositoriesNames.authRepository]: asClass(AuthRepository).scoped(),
    [RepositoriesNames.taskRepository]: asValue(AppDataSource.getRepository(TaskEntity)),
  });

  // register controller
  container.register({
    [ControllerNames.userController]: asClass(UserController).scoped(),
    [ControllerNames.authController]: asClass(AuthController).scoped(),
    [ControllerNames.taskController]: asClass(TaskController).scoped()

  })

  return container;
};

export { configureContainer };
