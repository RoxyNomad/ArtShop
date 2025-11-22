// libs/domain/order/order.repository.ts
import { Order } from './order.entity';

export abstract class OrderRepository {
  abstract findById(id: string): Promise<Order | null>;
  abstract findByUserId(userId: string): Promise<Order[]>;
  abstract findAll(): Promise<Order[]>;
  abstract save(order: Order): Promise<Order>;
  abstract delete(id: string): Promise<void>;
}
