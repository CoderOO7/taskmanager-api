import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { TOKEN_EXPIRES_IN } from "../constants";
import { AppDataSource } from "../config/typeorm/data-source";
import { JWT } from "@fastify/jwt";

class AuthRepository extends Repository<UserEntity> {
  constructor(){
    const _authRepository = AppDataSource.getRepository(UserEntity);
    super(
      _authRepository.target,
      _authRepository.manager,
      _authRepository.queryRunner
    );
  }

  generateToken = async (user: UserEntity, jwt: JWT): Promise<string> => {
    const token = jwt.sign({ userId: user.id }, {
      expiresIn: TOKEN_EXPIRES_IN,
    });
    
    return token;
  };

}

export { AuthRepository };
