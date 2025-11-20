import { Product } from './product.entity';

export interface ProductRepository {
  findById(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
