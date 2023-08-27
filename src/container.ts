import { createContainer, asClass, asValue } from "awilix";
import { AuthService } from "./services/auth.service";
import { UserController } from "./controllers/user.controller";
import { IAppContainer } from "./interfaces/container.interface";
import { ControllerNames, RepositoriesNames, ServicesNames } from "./enums";
import { UserService } from "./services/user.service";
import { AppDataSource } from "./config/typeorm/data-source";
import { UserEntity } from "./entities/user.entity";

const configureContainer = () => {
  const container : IAppContainer = createContainer();
  
  // register services
  container.register({
    [ServicesNames.authService]: asClass(AuthService).scoped(),
    [ServicesNames.userService]: asClass(UserService).scoped(),
  });

  // register repositories
  container.register({
    [RepositoriesNames.userRepository]: asValue(AppDataSource.getRepository(UserEntity)),
  });

  // register controller
  container.register({
    [ControllerNames.userController]: asClass(UserController).scoped(),
  })

  return container;
};

export { configureContainer };
