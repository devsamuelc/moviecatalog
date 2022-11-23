import type { ClientOpts } from 'redis';
import { redisStore } from 'cache-manager-redis-store'
import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movies/movie.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      // @ts-ignore
      store: async () => await redisStore({

        ttl: 60,
        socket: {
          host: 'localhost',
          port: 6379,
        },
      }),
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MovieModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
