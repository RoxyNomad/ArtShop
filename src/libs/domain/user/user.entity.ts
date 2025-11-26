// libs/domain/user/user.entity.ts
import { Order } from '../order/order.entity';
import { UserRole } from '@prisma/client';

export class User {
  id?: string;
  email: string;
  name: string | null;
  password?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
