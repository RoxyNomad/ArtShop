// libs/infrastructure/http/order/order.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../../application/order/commands/create-order.command';
import { Order } from '../../../domain/order/order.entity';

export class CreateOrderDto {
  userId: string;
  products: { productId: string; quantity: number }[];
}

@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.commandBus.execute(
      new CreateOrderCommand(createOrderDto.userId, createOrderDto.products),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    // Implementierung für Bestellungabruf
    console.log(`Get order with id: ${id}`);
    return Promise.resolve(null as any);
  }
}
