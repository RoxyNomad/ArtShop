// libs/infrastructure/database/prisma/repositories/mappers/product.mapper.ts
import { Injectable } from '@nestjs/common';
import { Product } from '../../../../../domain/product/product.entity';

/**
 * ProductMapper
 *
 * This mapper is responsible for converting:
 *  - Database models (Prisma records) → Domain entities (Product)
 *  - Domain entities (Product) → Persistence models for Prisma
 *
 * This ensures the domain layer stays completely independent
 * from the database structure.
 */
@Injectable()
export class ProductMapper {
  /**
   * Converts a raw Prisma database record into a Product domain entity.
   * This isolates the domain from database-specific representation.
   */
  toDomain(product: any): Product {
    if (!product) return null;

    return new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.createdAt,
      product.updatedAt,
    );
  }

  /**
   * Converts a Product domain entity into a plain object that Prisma can store.
   * This prevents Prisma-specific types from leaking into the domain layer.
   */
  toPersistence(product: Product): any {
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
