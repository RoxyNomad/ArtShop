// libs/infrastructure/database/prisma/repositories/order.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../../domain/order/order.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Order } from '../../../../domain/order/order.entity';
import { mapPrismaOrderToEntity } from './mappers/order.mapper';
import type {
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
} from '@prisma/client';

type PrismaOrderWithItems = PrismaOrder & {
  orderItems: PrismaOrderItem[];
};
@Injectable()
export class OrderRepositoryImpl extends OrderRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findById(id: string): Promise<Order | null> {
    const order: PrismaOrderWithItems | null =
      await this.prisma.order.findUnique({
        where: { id },
        include: { orderItems: true },
      });

    if (!order) return null;

    return mapPrismaOrderToEntity(order);
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders: PrismaOrderWithItems[] = await this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: true },
    });

    return orders.map(mapPrismaOrderToEntity);
  }

  async findAll(): Promise<Order[]> {
    const orders: PrismaOrderWithItems[] = await this.prisma.order.findMany({
      include: { orderItems: true },
    });

    return orders.map(mapPrismaOrderToEntity);
  }

  async save(order: Order): Promise<Order> {
    const savedOrder: PrismaOrderWithItems = await this.prisma.order.upsert({
      where: { id: order.id },
      update: {
        total: order.total,
        status: order.status,
        updatedAt: order.updatedAt,
        orderItems: {
          deleteMany: {},
          create: order.orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      create: {
        id: order.id,
        userId: order.userId,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        orderItems: {
          create: order.orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });

    return mapPrismaOrderToEntity(savedOrder);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}
