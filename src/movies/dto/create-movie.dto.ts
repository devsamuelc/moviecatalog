import { MovieGenres } from '../enum/movie-genre.enum';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  poster?: string;

  @IsEnum(MovieGenres)
  @IsNotEmpty()
  @ApiProperty()
  mainGenre: MovieGenres;

  @IsEnum(MovieGenres)
  @IsOptional()
  @ApiPropertyOptional()
  secondaryGenre?: MovieGenres;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  director?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  releaseYear?: string;
}
