// libs/domain/order/order.entity.ts
import { OrderItem } from './order-item.entity';

export class Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}
