import { createContainer, asClass, asValue } from "awilix";
import { AuthService } from "./services/auth.service";
import { UserController } from "./controllers/user.controller";
import { IAppContainer } from "./interfaces/container.interface";
import { ControllerNames, RepositoriesNames, ServicesNames } from "./enums";
import { UserService } from "./services/user.service";
import { AuthRepository, UserRepository } from "./repositories";
import { AuthController } from "./controllers/auth.controller";

const configureContainer = () => {
  const container : IAppContainer = createContainer();
  // const userRepository:any = AppDataSource.getRepository();
  
  // register services
  container.register({
    [ServicesNames.authService]: asClass(AuthService).scoped(),
    [ServicesNames.userService]: asClass(UserService).scoped(),
  });

  // register repositories
  container.register({
    [RepositoriesNames.userRepository]: asClass(UserRepository).scoped(),
    [RepositoriesNames.authRepository]: asClass(AuthRepository).scoped(),
  });

  // register controller
  container.register({
    [ControllerNames.userController]: asClass(UserController).scoped(),
    [ControllerNames.authController]: asClass(AuthController).scoped(),
  })

  return container;
};

export { configureContainer };
