// libs/infrastructure/http/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { AuthController } from './auth.controller';
import { UserRepositoryImpl } from '../../../infrastructure/database/prisma/repositories/user.repository.impl';
import { UserMapper } from '../../../infrastructure/database/prisma/repositories/mappers/user.mapper';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { RolesGuard } from '../../../infrastructure/auth/guards/roles.guard';
import { JwtStrategy } from '../../../infrastructure/auth/strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: 'super-secret', // env variable später
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepositoryImpl,
    UserMapper,
    RolesGuard,
    JwtStrategy,
    { provide: 'UserRepository', useExisting: UserRepositoryImpl },
  ],
})
export class AuthModule {}
