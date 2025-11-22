// libs/application/order/commands/create-order.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../../domain/order/order.repository';
import { CreateOrderCommand } from './create-order.command';
import { Order } from '../../../domain/order/order.entity';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const order = new Order();
    order.id = '';
    order.userId = command.userId;
    order.total = 0; // Wird später berechnet
    order.status = 'pending';
    order.createdAt = new Date();
    order.updatedAt = new Date();
    return await this.orderRepository.save(order);
  }
}
