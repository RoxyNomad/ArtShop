// libs/infrastructure/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { JwtPayload } from '../types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly users: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret', // später durch env variable ersetzen
    });
  }

  /**
   * Validate wird automatisch von Passport aufgerufen,
   * wenn ein JWT im Request gefunden wurde und signiert ist.
   * Das Ergebnis wird dann als `req.user` verfügbar.
   */
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.users.findById(payload.sub);
    return user; // req.user = user
  }
}
