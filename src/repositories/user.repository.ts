import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../config/typeorm/data-source";

class UserRepository extends Repository<UserEntity> {
  // Add custom repository methods if needed
  constructor() {
    const _userRepository = AppDataSource.getRepository(UserEntity);
    super(
      _userRepository.target,
      _userRepository.manager,
      _userRepository.queryRunner
    );
  }
}

export { UserRepository };
