// libs/infrastructure/http/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { RegisterCustomerDto } from '../../../domain/auth/register/register-customer.dto';
import { RegisterArtistDto } from '../../../domain/auth/register/register-artist.dto';
import { LoginDto } from '../../../domain/auth/login/login.dto';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { Roles } from '../../../infrastructure/auth/decorators/roles.decorator';
import { RolesGuard } from '../../../infrastructure/auth/guards/roles.guard';
import { UserRole } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register-customer')
  registerCustomer(@Body() dto: RegisterCustomerDto) {
    return this.service.registerCustomer(dto);
  }

  @Post('register-artist')
  registerArtist(@Body() dto: RegisterArtistDto) {
    return this.service.registerArtist(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  // ---------------------------------------------------------
  // Beispiel geschützter Route für Admin
  // ---------------------------------------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin-only')
  adminOnly(@Request() req) {
    return { message: `Hello Admin ${req.user.email}` };
  }

  // ---------------------------------------------------------
  // Beispiel geschützter Route für Artists
  // ---------------------------------------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ARTIST)
  @Get('artist-only')
  artistOnly(@Request() req) {
    return { message: `Hello Artist ${req.user.email}` };
  }

  // ---------------------------------------------------------
  // Beispiel geschützte Route für alle angemeldeten User
  // ---------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
