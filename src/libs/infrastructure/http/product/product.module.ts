// libs/infrastructure/http/product/product.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './product.controller';
import { ProductModule as ApplicationProductModule } from '../../../application/product/product.module';

@Module({
  imports: [CqrsModule, ApplicationProductModule],
  controllers: [ProductController],
})
export class ProductHttpModule {}
