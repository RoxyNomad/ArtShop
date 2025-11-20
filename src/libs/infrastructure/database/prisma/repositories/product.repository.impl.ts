// libs/infrastructure/database/prisma/repositories/product.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { Product } from '../../../../domain/product/product.entity';
import { ProductRepository } from '../../../../domain/product/product.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product as Product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products as Product[];
  }

  async save(product: Product): Promise<Product> {
    const savedProduct = await this.prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
    return savedProduct as Product;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
