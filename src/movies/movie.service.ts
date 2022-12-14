import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { Repository, ILike } from 'typeorm';
import { FindMovieDto } from './dto/find-movie.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(user, createMovieDto: CreateMovieDto) {
    const {
      title,
      description,
      director,
      mainGenre,
      secondaryGenre,
      poster,
      releaseYear,
    } = createMovieDto;

    const movie = await this.movieRepository.save(
      this.movieRepository.create({
        title,
        description,
        director,
        mainGenre,
        poster,
        secondaryGenre,
        releaseYear,
        uploadedBy: user.id,
      }),
    );

    return movie;
  }

  async find(findMovieDto: Partial<FindMovieDto>) {
    try {
      const {
        title,
        mainGenre,
        secondaryGenre,
        releaseYear,
        director,
        limit,
        page,
      } = findMovieDto;

      const query = { where: {}, skip: 0 };

      if (limit) query['take'] = limit;
      if (page) query.skip = 10 * page;

      if (title) query.where['title'] = ILike(title);
      if (mainGenre) query.where['mainGenre'] = mainGenre;
      if (secondaryGenre) query.where['secondaryGenre'] = secondaryGenre;
      if (releaseYear) query.where['releaseYear'] = releaseYear;
      if (director) query.where['director'] = director;

      const [movies] = await this.movieRepository.findAndCount(query);

      return movies;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: string) {
    let movie: Movie;
    const movieRedis: string = await this.cacheManager.get(`movie-${id}`)

    try {
      if(movieRedis !== null && movieRedis !== undefined) {
        movie = JSON.parse(movieRedis);
      } else {
        movie = await this.movieRepository.findOne({
                where: {
                  id,
                },
              });
      }

      return movie;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      const test = await this.movieRepository
        .createQueryBuilder()
        .update(updateMovieDto)
        .where({
          id,
        })
        .returning('*')
        .execute();

      return test.raw[0];
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      await this.movieRepository.delete({ id });

      return 'Movie deleted successfully';
    } catch (error) {
      return error.message;
    }
  }
}
