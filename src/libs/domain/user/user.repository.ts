// libs/domain/user/user.repository.ts
import { User } from './user.entity';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract save(user: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
