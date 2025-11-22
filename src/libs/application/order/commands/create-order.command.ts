// libs/application/order/commands/create-order.command.ts
export class CreateOrderCommand {
  constructor(
    public readonly userId: string,
    public readonly products: { productId: string; quantity: number }[],
  ) {}
}
