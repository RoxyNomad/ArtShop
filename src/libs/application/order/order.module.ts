// libs/application/order/order.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { ProductModule } from '../product/product.module';
import { OrderRepository } from '../../domain/order/order.repository';
import { OrderRepositoryImpl } from '../../infrastructure/database/prisma/repositories/order.repository.impl';
import { CreateOrderHandler } from './commands/create-order.handler';
import { GetProductHandler } from '../../application/product/queries/get-product.handler';

@Module({
  imports: [CqrsModule, PrismaModule, ProductModule],
  providers: [
    CreateOrderHandler,
    GetProductHandler,
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
  ],
  exports: [OrderRepository],
})
export class OrderModule {}
