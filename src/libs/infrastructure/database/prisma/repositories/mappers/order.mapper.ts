// libs/infrastructure/database/prisma/repositories/mappers/order.mapper.ts
import { Order } from '../../../../../domain/order/order.entity';
import { OrderItem } from '../../../../../domain/order/order-item.entity';
import type {
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
} from '@prisma/client';

export function mapPrismaOrderToEntity(
  prismaOrder: PrismaOrder & { orderItems: PrismaOrderItem[] },
): Order {
  return {
    id: prismaOrder.id,
    userId: prismaOrder.userId,
    total: prismaOrder.total,
    status: prismaOrder.status,
    createdAt: prismaOrder.createdAt,
    updatedAt: prismaOrder.updatedAt,
    orderItems: prismaOrder.orderItems.map(
      (item): OrderItem => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        createdAt: item.createdAt,
      }),
    ),
  };
}
