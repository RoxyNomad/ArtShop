// libs/infrastructure/auth/types/jwt-payload.interface.ts
import { UserRole } from '@prisma/client';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: UserRole;
}
