import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { FindMovieDto } from './dto/find-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
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
    try {
      const movie = await this.movieRepository.findOne({
        where: {
          id,
        },
      });

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
