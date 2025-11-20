import { Order } from './order.entity';

export interface OrderRepository {
  findById(id: string): Promise<Order>;
  findByUserId(userId: string): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  save(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}
