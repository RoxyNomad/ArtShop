// libs/infrastructure/database/prisma/repositories/mappers/product.mapper.ts
import type { Product as PrismaProduct } from '@prisma/client';
import type { Product } from '../../../../../domain/product/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductMapper {
  toDomain(prismaProduct: PrismaProduct | null): Product | null {
    if (!prismaProduct) return null;

    return {
      id: prismaProduct.id,
      name: prismaProduct.name,
      description: prismaProduct.description,
      price: prismaProduct.price,
      image: prismaProduct.image,
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt,
    };
  }

  /**
   * Converts a domain Product into a Prisma-compatible object.
   */
  toPersistence(product: Product) {
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
