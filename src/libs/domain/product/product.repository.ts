// libs/domain/product/product.repository.ts
import { Product } from './product.entity';

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
  abstract save(product: Product): Promise<Product>;
  abstract delete(id: string): Promise<void>;
}
