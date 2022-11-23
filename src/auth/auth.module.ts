import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { userProviders } from '../user/user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.APP_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [...userProviders, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
