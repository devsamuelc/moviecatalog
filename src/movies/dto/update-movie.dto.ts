import { MovieGenres } from '../enum/movie-genre.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  primaryGenre?: MovieGenres;

  @ApiPropertyOptional()
  secondaryGenre?: MovieGenres;

  @ApiPropertyOptional()
  director?: string;

  @ApiPropertyOptional()
  releaseDate?: string;
}
