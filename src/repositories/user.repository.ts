import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

class UserRepository extends Repository<UserEntity> {
  // Add custom repository methods if needed
}

export { UserRepository };
