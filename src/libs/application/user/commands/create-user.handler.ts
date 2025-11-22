// libs/application/user/commands/create-user.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../domain/user/user.repository';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../../domain/user/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const user = new User();
    user.id = '';
    user.email = command.email;
    user.name = command.name;
    user.password = command.password;
    user.role = 'customer';
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return await this.userRepository.save(user);
  }
}
