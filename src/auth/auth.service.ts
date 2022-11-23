import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async login(loginInfo: AuthDto) {
    const { email, password } = loginInfo;

    const user = await this.validateUser(email, password);
    if (!user) throw Error('Usuário Inválido');

    const payload = {
      sub: user.id,
      email: user.email,
      movies: user.movies,
      userType: user.userType,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    const userRedis: string = await this.cacheManager.get(`user-${email}`);

    if (userRedis !== null && userRedis !== undefined) {
      user = JSON.parse(userRedis);
    } else {
      user = await this.userService.getByEmail(email);

      await this.cacheManager.set(`user-${email}`, JSON.stringify(user), 5);
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) throw Error('Senha Incorreta');

    return user;
  }
}
