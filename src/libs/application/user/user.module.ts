// libs/application/user/user.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { UserRepository } from '../../domain/user/user.repository';
import { UserRepositoryImpl } from '../../infrastructure/database/prisma/repositories/user.repository.impl';
import { CreateUserHandler } from './commands/create-user.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [
    CreateUserHandler,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
