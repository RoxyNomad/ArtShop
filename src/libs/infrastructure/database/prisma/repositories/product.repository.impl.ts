// libs/infrastructure/database/prisma/repositories/product.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { Product } from '../../../../domain/product/product.entity';
import { ProductRepository } from '../../../../domain/product/product.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ProductMapper, // <-- Mapper added here
  ) {}

  /**
   * Finds a product by its ID.
   * Prisma returns a raw database object → the mapper converts it into a domain entity.
   */
  async findById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product ? this.mapper.toDomain(product) : null;
  }

  /**
   * Returns all products from the database.
   * Maps each record to a domain entity.
   */
  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((p) => this.mapper.toDomain(p));
  }

  /**
   * Saves (upserts) a product.
   * Domain entity → Mapper converts to Prisma-compatible data object.
   */
  async save(product: Product): Promise<Product> {
    const mappedData = this.mapper.toPersistence(product);

    const savedProduct = await this.prisma.product.upsert({
      where: { id: product.id },
      update: mappedData,
      create: mappedData,
    });

    return this.mapper.toDomain(savedProduct);
  }

  /**
   * Deletes a product by its ID.
   */
  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
