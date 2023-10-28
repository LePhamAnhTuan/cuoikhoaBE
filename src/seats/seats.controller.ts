import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto, SeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags("Seat")
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) { }

  @ApiBody({
    description: "clos : Number-> số cột ghế -> default(10) </br> rows: string[] -> hàng ghế ->default[A,B,C...,K] 11 cột",
    examples: { rows: { value: ["A", "B", "C", "...", "K"] as any } }
  })
  @Post("/add-seat")
  create(@Query('cinemaId') CinemasID: number, @Query('movieId') MoviesID: number, @Query('cols') cols: number, @Body() rows: string[]) {
    return this.seatsService.create(Number(MoviesID), Number(CinemasID), Number(cols), rows);
  }

  @Get("/get-all-seat")
  findAll() {
    return this.seatsService.findAll();
  }

  @Get('/get-by-id:id')
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id);
  }


  @Post('delete-by-id/:id')
  remove(@Param('id') id: string) {
    return this.seatsService.remove(+id);
  }
}
