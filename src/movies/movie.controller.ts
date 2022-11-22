import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FindMovieDto } from './dto/find-movie.dto';
import _ from 'lodash';

@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: any, @Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(req.user, createMovieDto);
  }

  @Get()
  find(@Query() findMovieDto: FindMovieDto) {
    return this.movieService.find(findMovieDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    if (req.userType === 'admin' || _.find(req.movies, { id })) {
      return this.movieService.update(id, updateMovieDto);
    } else {
      throw Error("You don't have the permissions to do this.");
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: any, @Param('id') id: string) {
    if (req.userType === 'admin' || _.find(req.movies, { id })) {
      return this.movieService.remove(id);
    } else {
      throw Error("You don't have the permissions to do this.");
    }
  }
}
