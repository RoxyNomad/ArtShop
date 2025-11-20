// libs/infrastructure/database/prisma/repositories/order.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { Order } from '../../../../domain/order/order.entity';
import { OrderRepository } from '../../../../domain/order/order.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });
    return order as Order;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: true,
      },
    });
    return orders as Order[];
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });
    return orders as Order[];
  }

  async save(order: Order): Promise<Order> {
    const savedOrder = await this.prisma.order.upsert({
      where: { id: order.id },
      update: order,
      create: order,
    });
    return savedOrder as Order;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
