// libs/infrastructure/http/product/product.controller.ts
import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../../../application/product/commands/create-product.command';
import { GetProductQuery } from '../../../application/product/queries/get-product.query';
import { Product } from '../../../domain/product/product.entity';

export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  image?: string;
}

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.commandBus.execute(
      new CreateProductCommand(
        createProductDto.name,
        createProductDto.description ?? '',
        createProductDto.price,
        createProductDto.image ?? '',
      ),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.queryBus.execute(new GetProductQuery(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    // Implementierung für Produktlöschung
    console.log(`Delete product with id: ${id}`);
  }
}
