// libs/infrastructure/http/order/order.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderController } from './order.controller';
import { OrderModule as ApplicationOrderModule } from '../../../application/order/order.module';

@Module({
  imports: [CqrsModule, ApplicationOrderModule],
  controllers: [OrderController],
})
export class OrderHttpModule {}
