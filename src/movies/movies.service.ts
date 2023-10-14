import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MoviesService {

  model = new PrismaClient()

  create(createMovieDto: CreateMovieDto) {
    return this.model.movies.create({
      data: createMovieDto
    });
  }

  findAll() {
    return this.model.movies.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
