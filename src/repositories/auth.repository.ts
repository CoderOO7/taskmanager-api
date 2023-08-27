import { Repository } from "typeorm";
import jwt from "jsonwebtoken";
import { fromEnv } from "../utils";
import { UserEntity } from "../entities/user.entity";
import { TOKEN_EXPIRES_IN } from "../constants";
import { AppDataSource } from "../config/typeorm/data-source";

class AuthRepository extends Repository<UserEntity> {
  constructor(){
    const _authRepository = AppDataSource.getRepository(UserEntity);
    super(
      _authRepository.target,
      _authRepository.manager,
      _authRepository.queryRunner
    );
  }

  generateToken = async (user: UserEntity): Promise<string> => {
    const token = jwt.sign({ userId: user.id }, fromEnv("JWT_SECRET"), {
      expiresIn: TOKEN_EXPIRES_IN,
    });
    
    return token;
  };

}

export { AuthRepository };
