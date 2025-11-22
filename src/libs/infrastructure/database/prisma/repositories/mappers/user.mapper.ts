// libs/infrastructure/database/prisma/repositories/mappers/user.mapper.ts
import type { User as PrismaUser } from '@prisma/client';
import type { User } from '../../../../../domain/user/user.entity';

export class UserMapper {
  toDomain(prismaUser: PrismaUser | null): User | null {
    if (!prismaUser) return null;

    return {
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password,
      name: prismaUser.name,
      role: prismaUser.role,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }
  toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
