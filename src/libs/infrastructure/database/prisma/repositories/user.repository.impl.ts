// libs/infrastructure/database/prisma/repositories/user.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../domain/user/user.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { UserMapper } from './mappers/user.mapper';
import { User } from '../../../../domain/user/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return this.mapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return this.mapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => this.mapper.toDomain(u));
  }

  async save(user: User): Promise<User> {
    const persistence = this.mapper.toPersistence(user);
    const saved = await this.prisma.user.upsert({
      where: { id: user.id },
      create: persistence,
      update: persistence,
    });
    return this.mapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
