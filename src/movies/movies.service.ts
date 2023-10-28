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
    return this.model.movies.findMany({
      orderBy: { MovieID: "desc" }
    });
  }

  findOne(id: number) {
    return this.model.movies.findFirst({
      where: { MovieID: id }
    });
  }
  search(title: string) {
    return this.model.movies.findMany({
      where: {
        MovieTitle: { contains: title }
      }
    })
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.model.movies.update({
      where: { MovieID: id },
      data: updateMovieDto
    });
  }

  remove(id: number) {
    return this.model.movies.delete({
      where: { MovieID: id }
    });
  }

}
