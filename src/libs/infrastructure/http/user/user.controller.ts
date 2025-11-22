// libs/infrastructure/http/user/user.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../application/user/commands/create-user.command';
import { User } from '../../../domain/user/user.entity';

// DTO to provide proper typing for the request body
export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.commandBus.execute(
      new CreateUserCommand(
        createUserDto.email,
        createUserDto.name,
        createUserDto.password,
      ),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    // Implementierung für Benutzerabruf
    console.log(`Get user with id: ${id}`);
    return Promise.resolve(null as any);
  }
}
