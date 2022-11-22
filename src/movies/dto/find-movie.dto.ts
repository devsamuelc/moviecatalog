import { MovieGenres } from '../enum/movie-genre.enum';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  title?: string;

  @IsEnum(MovieGenres)
  @IsNotEmpty()
  @ApiPropertyOptional({ enum: MovieGenres })
  mainGenre?: MovieGenres;

  @IsEnum(MovieGenres)
  @IsOptional()
  @ApiPropertyOptional({ enum: MovieGenres })
  secondaryGenre?: MovieGenres;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  director?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  releaseYear?: string;

  @IsOptional()
  @ApiPropertyOptional({ default: 10 })
  limit?: number;

  @IsOptional()
  @ApiPropertyOptional({ default: 0 })
  page?: number;
}
