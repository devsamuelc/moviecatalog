import {
  Body,
  Controller,
  Post,
  UseGuards,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthGuard('local'))
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }
}
