// libs/infrastructure/database/prisma/repositories/product.repository.impl.ts
import { Injectable } from '@nestjs/common';
import type { Product } from '../../../../domain/product/product.entity';
import { ProductRepository } from '../../../../domain/product/product.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ProductMapper,
  ) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return this.mapper.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((p) => this.mapper.toDomain(p)!);
  }

  async save(product: Product): Promise<Product> {
    const persistenceData = this.mapper.toPersistence(product);

    const savedProduct = await this.prisma.product.upsert({
      where: { id: product.id },
      update: persistenceData,
      create: persistenceData,
    });

    return this.mapper.toDomain(savedProduct)!;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
