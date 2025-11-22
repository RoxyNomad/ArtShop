// libs/domain/order/order-item.entity.ts
export class OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
}
