// libs/domain/user/user.entity.ts
export class User {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
