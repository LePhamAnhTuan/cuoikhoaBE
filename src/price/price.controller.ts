import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PriceService } from './price.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SeatDTO } from './dto/create-price.dto';

// @UseGuards(AuthGuard("jwt"))
// @ApiBearerAuth()
@ApiTags("Price")
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) { }

  @Post()
  create(@Query("movieId") movieId, @Query("seatId") seatId, @Body() body: SeatDTO) {
    return this.priceService.create(Number(movieId), Number(seatId), body);
  }

}
