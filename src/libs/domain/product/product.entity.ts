// libs/domain/product/product.entity.ts
export class Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
