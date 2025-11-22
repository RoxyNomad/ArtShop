// libs/application/product/create-product.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateProductCommand) {
    const { name, description, price, image } = command;

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
      },
    });

    return product;
  }
}