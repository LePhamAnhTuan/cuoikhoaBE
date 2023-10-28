import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errorCode, successCode } from 'src/utils/customRes';
import { SeatDto } from './dto/create-seat.dto';

@Injectable()
export class SeatsService {

  modal = new PrismaClient()

  async create(MoviesID: number, CinemasID: number, cols: number, rows: Array<string>) {
    try {
      if (rows === undefined || rows.length === 0 || rows === null || rows[3] === "...") {
        rows = ["A", "B", "C", "D", "E", "F", "G", "J", "K"]
      }
      if (cols === undefined || cols >= 25) {
        return "Please cols < 25"
      }
      let Seat: { [key: string]: any } = {};
      for (let i = 0; i < rows.length; i++) {
        let colSeat: any[] = [];
        for (let counter: number = 1; counter <= cols; counter++) {

          let seatDetail: SeatDto = {
            tenGhe: `Ghế ${rows[i]}${counter}`,
            gia: 2000,
            status: "userId",
            stt: counter,
          };
          colSeat.push(seatDetail);
        }
        Seat[rows[i]] = colSeat
      }

      const data = await this.modal.seats.create({
        data: {
          CinemaID: CinemasID,
          MovieID: MoviesID,
          RowSeat: 2,
          Seat
        }
      });

      return successCode(data)
    } catch (error) {
      return errorCode(error)
    }


  }
  async findAll() {
    try {
      const data = await this.modal.seats.findMany({
        where: {
          isRemove: false || null
        },
        orderBy: { SeatID: "desc" }

      })
      return successCode(data)
    } catch (error) {
      errorCode(error)
    }

  }

  async findOne(id: number) {
    try {
      const data = await this.modal.seats.findUnique({
        where: { SeatID: id, isRemove: false || null }
      });
      return successCode(data)
    } catch (error) {
      errorCode(error)
    }

  }


  async remove(id: number) {
    try {
      const data = await this.modal.seats.update({
        where: { SeatID: id },
        data: { isRemove: true }
      })
      return successCode(data)
    } catch (error) {
      errorCode(error)
    }
  }
}
