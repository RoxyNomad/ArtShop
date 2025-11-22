// libs/infrastructure/http/user/user.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { UserModule as ApplicationUserModule } from '../../../application/user/user.module';

@Module({
  imports: [CqrsModule, ApplicationUserModule],
  controllers: [UserController],
})
export class UserHttpModule {}
