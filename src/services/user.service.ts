import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  createUser = async (name: string, email: string, password: string) => {
    const user = await this.userRepository.save({ name, email, password });
    return user;
  };

  updateUser = async (id: string, data: any) => {
    const user = await this.userRepository.update({ id }, data);
    if (user.affected) {
      return await this.userRepository.findOneBy({ id });
    }
    return user;
  };

  deleteUser = async (id: string) => {
    const user = await this.userRepository.delete({ id });
    if (!user.affected) {
      throw new Error("User not found");
    }
    return user;
  };

  getUser = async (id: string) => {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  };

  getAllUsers = async () => {
    return await this.userRepository.find();
  };
}
