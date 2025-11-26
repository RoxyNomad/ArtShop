// libs/application/product/queries/get-product.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../../domain/product/product.repository';
import { GetProductQuery } from './get-product.query';
import { Product } from '../../../domain/product/product.entity';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductQuery): Promise<Product | null> {
    return await this.productRepository.findById(query.id);
  }
}
