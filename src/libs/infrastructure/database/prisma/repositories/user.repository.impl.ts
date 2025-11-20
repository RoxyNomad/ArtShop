// libs/infrastructure/database/prisma/repositories/user.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/user/user.entity';
import { UserRepository } from '../../../../domain/user/user.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user as User;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user as User;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users as User[];
  }

  async save(user: User): Promise<User> {
    const savedUser = await this.prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
    return savedUser as User;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
