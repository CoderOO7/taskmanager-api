import createHttpError from "http-errors";
import { UserRepository } from "../repositories/user.repository";
import { USER_NOT_FOUND, USER_WITH_EMAIL_EXIST } from "../constants/errors";

export class UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  createUser = async (name: string, email: string, password: string) => {
    const exist = await this.userRepository.findOneBy({email});
    if(exist){
      throw createHttpError.Conflict(USER_WITH_EMAIL_EXIST);
    }
    const user = await this.userRepository.save({ name, email, password });
    return user;
  };

  updateUser = async (id: string, data: any) => {
    const user = await this.userRepository.update({ id }, data);
    if (!user.affected) {
      throw createHttpError.NotFound(USER_NOT_FOUND);
    }
    return await this.userRepository.findOneBy({ id });
  };

  deleteUser = async (id: string) => {
    const user = await this.userRepository.delete({ id });
    if (!user.affected) {
      throw createHttpError.NotFound(USER_NOT_FOUND);
    }
    return user;
  };

  getUser = async (id: string) => {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw createHttpError.NotFound(USER_NOT_FOUND);
    }
    return user;
  };

  getAllUsers = async () => {
    return await this.userRepository.find();
  };

  getLoggedInUser = async (id: string) => {
    return await this.getUser(id);
  };
}
