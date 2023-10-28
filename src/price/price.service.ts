import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SeatDTO } from './dto/create-price.dto';


@Injectable()
export class PriceService {

  modal = new PrismaClient()

  async create(movieId: number, seatId: number, body: SeatDTO) {

    try {
      const data: any = await this.modal.seats.findUnique({
        where: {
          MovieID: movieId,
          SeatID: seatId,
        },
        select: {
          Seat: true
        }
      })
      if (data) {
        const row = JSON.parse(body.rowSeat)
        const tenGhe = data.Seat.row
        return tenGhe
        const value = tenGhe.find((seat: { tenGhe: string; }) => seat.tenGhe === body.tenGhe)
        if (value) {
          return value
        }
      }
      return "loi be"

      // const userBookSeat = await this.modal.seats.update({
      //   where: {
      //     MovieID: movieId,
      //     SeatID: seatId,
      //   },
      //   data: {
      //     Seat: {

      //       "A": [
      //         {
      //           "gia": 2000,
      //           "stt": 1,
      //           "status": "userId",
      //           "tenGhe": "Ghế A1"
      //         },
      //         {
      //           "gia": 2000,
      //           "stt": 2,
      //           "status": "userId",
      //           "tenGhe": "Ghế A2"
      //         },
      //         {
      //           "gia": 2000,
      //           "stt": 3,
      //           "status": "userId",
      //           "tenGhe": "Ghế A3"
      //         }
      //       ],
      //       "B": [
      //         {
      //           "gia": 2000,
      //           "stt": 1,
      //           "status": "userId",
      //           "tenGhe": "Ghế B1"
      //         },
      //         {
      //           "gia": 2000,
      //           "stt": 2,
      //           "status": "userId",
      //           "tenGhe": "Ghế B2"
      //         },
      //         {
      //           "gia": 2000,
      //           "stt": 3,
      //           "status": "userId",
      //           "tenGhe": "Ghế B3"
      //         }
      //       ],
      //       "C": [
      //         {
      //           "gia": 2000,
      //           "stt": 1,
      //           "status": "userId",
      //           "tenGhe": "Ghế C1"
      //         },
      //         {
      //           "gia": 2000,
      //           "stt": 2,
      //           "status": "userId",
      //           "tenGhe": "Ghế C2"
      //         },
      //         {
      //           "gia": 2000,
      //           "stt": 3,
      //           "status": "userId",
      //           "tenGhe": "Ghế C3"
      //         }]
      //     }
      //   },

      // })
      // return userBookSeat
    } catch (error) {
      return error
    }

  }


}
