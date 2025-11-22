// libs/infrastructure/database/prisma/repositories/user.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/user/user.entity';
import { UserRepository } from '../../../../domain/user/user.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userMapper: UserMapper,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userRecord = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.userMapper.toDomain(userRecord); // returns User | null
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await this.prisma.user.findUnique({
      where: { email },
    });

    return this.userMapper.toDomain(userRecord); // returns User | null
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => this.userMapper.toDomain(u)!);
  }

  async save(user: User): Promise<User> {
    const data = this.userMapper.toPersistence(user);

    const savedUser = await this.prisma.user.upsert({
      where: { id: user.id },
      update: data,
      create: data,
    });

    return this.userMapper.toDomain(savedUser)!;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
