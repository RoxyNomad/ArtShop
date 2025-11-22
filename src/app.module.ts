// app.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './libs/infrastructure/database/prisma/prisma.module';
import { ProductHttpModule } from './libs/infrastructure/http/product/product.module';
import { UserHttpModule } from './libs/infrastructure/http/user/user.module';
import { OrderHttpModule } from './libs/infrastructure/http/order/order.module';

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    ProductHttpModule,
    UserHttpModule,
    OrderHttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
