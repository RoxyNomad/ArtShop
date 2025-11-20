// apps/api/api.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from '../../libs/application/product/product.module';
import { UserModule } from '../../libs/application/user/user.module';
import { OrderModule } from '../../libs/application/order/order.module';
import { DatabaseModule } from '../../libs/infrastructure/database/database.module';
import { PaymentModule } from '../../libs/infrastructure/payment/payment.module';
import { StorageModule } from '../../libs/infrastructure/storage/storage.module';

@Module({
  imports: [
    CqrsModule,
    ProductModule,
    UserModule,
    OrderModule,
    DatabaseModule,
    PaymentModule,
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
