import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags("Movies")
// @UseGuards(AuthGuard("jwt"))
// @ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post("/add-movie")
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get("/get-all-movie")
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('/get-by-id')
  findOne(@Query('id') id: string) {
    return this.moviesService.findOne(+id);
  }
  @Get('/search-by-name')
  search(@Query('title') title: string) {
    return this.moviesService.search(title);
  }

  @Post('/update-movie-by-id')
  update(@Query('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
