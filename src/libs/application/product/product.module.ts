// libs/application/product/product.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { ProductRepository } from '../../domain/product/product.repository';
import { ProductRepositoryImpl } from '../../infrastructure/database/prisma/repositories/product.repository.impl';
import { CreateProductHandler } from './commands/create-product.handler';
import { GetProductHandler } from './queries/get-product.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [
    CreateProductHandler,
    GetProductHandler,
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
  ],
  exports: [ProductRepository],
})
export class ProductModule {}
