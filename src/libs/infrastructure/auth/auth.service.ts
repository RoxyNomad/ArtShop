// libs/infrastructure/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/user/user.repository';
import { UserRole } from '@prisma/client';
import { User } from '../../domain/user/user.entity';
import { RegisterCustomerDto } from '../../domain/auth/register/register-customer.dto';
import { RegisterArtistDto } from '../../domain/auth/register/register-artist.dto';
import { LoginDto } from '../../domain/auth/login/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async registerCustomer(dto: RegisterCustomerDto) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) throw new UnauthorizedException('Email already registered.');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = new User({
      email: dto.email,
      name: dto.name,
      password: hashed,
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
      orders: [],
    });

    const savedUser = await this.users.save(user);
    return this.createToken(savedUser);
  }

  async registerArtist(dto: RegisterArtistDto) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) throw new UnauthorizedException('Email already registered.');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = new User({
      email: dto.email,
      name: dto.name,
      password: hashed,
      role: UserRole.ARTIST,
      createdAt: new Date(),
      updatedAt: new Date(),
      orders: [],
    });

    const savedUser = await this.users.save(user);
    return this.createToken(savedUser);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Wrong credentials.');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Wrong credentials.');

    return this.createToken(user);
  }

  private createToken(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }
}
