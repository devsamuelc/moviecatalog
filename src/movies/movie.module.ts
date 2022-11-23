import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Movie } from './entities/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { movieProviders } from './movie.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController],
  providers: [...movieProviders, MovieService],
  exports: [MovieService],
})
export class MovieModule {}
