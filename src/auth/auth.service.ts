import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userRepository.findOne({
        where: {
          email,
        },
        relations: ['movies'],
      });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) throw Error('Senha Incorreta');

    return user;
  }
}
