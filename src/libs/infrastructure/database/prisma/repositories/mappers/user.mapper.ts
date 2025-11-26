// libs/infrastructure/database/prisma/repositories/mappers/user.mapper.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../../../../domain/user/user.entity';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserMapper {
  toDomain(user: any): User {
    if (!user) return null;
    return new User({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role as UserRole,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      orders: user.orders || [],
    });
  }

  toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
