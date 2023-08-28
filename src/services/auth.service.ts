import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { SALT } from "../constants";
import { AuthRepository } from "../repositories";
import createHttpError from "http-errors";
import { INVALID_PASSWORD, USER_NOT_FOUND } from "../constants/errors";

export class AuthService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor({ userRepository, authRepository }) {
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  registerUser = async (data, jwt) => {
    const { password, name, email } = data;

    const hashedPassword = await bcrypt.hash(password, SALT);

    const user = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    const token = await this.authRepository.generateToken(user, jwt);

    return { ...user, token };
  };

  loginUser = async (data, jwt) => {
    const { email, password } = data;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new createHttpError.NotFound(USER_NOT_FOUND);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new createHttpError.Unauthorized(INVALID_PASSWORD);
    }

    const token = await this.authRepository.generateToken(user, jwt);

    return { ...user, token };
  };
}
