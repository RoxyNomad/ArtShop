// libs/domain/auth/register/register-artist.dto.ts
import { BaseRegisterDto } from './base-register.dto';
import { IsString } from 'class-validator';

export class RegisterArtistDto extends BaseRegisterDto {
  @IsString()
  artistBio: string;
}
