import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { SALT } from "../constants";
import { AuthRepository } from "../repositories";

export class AuthService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor({ userRepository, authRepository }) {
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  registerUser = async (data) => {
    const { password, name, email } = data;

    const hashedPassword = await bcrypt.hash(password, SALT);

    const user = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    const token = await this.authRepository.generateToken(user);

    return { ...user, token };
  };

  loginUser = async (data) => {
    const { email, password } = data;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error("Invalid password");
    }

    const token = await this.authRepository.generateToken(user);

    return { ...user, token };
  };
}
