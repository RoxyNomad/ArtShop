// libs/application/user/commands/create-user.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../domain/user/user.repository';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../../domain/user/user.entity';
import { UserRole } from '@prisma/client';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const user = new User({
      id: '',
      email: command.email,
      name: command.name,
      password: command.password,
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.userRepository.save(user);
  }
}
