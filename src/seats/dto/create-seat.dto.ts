import { ApiBody, ApiProperty } from "@nestjs/swagger"

export class CreateSeatDto {
    @ApiProperty()
    CinemaID: number

    @ApiProperty()
    MoviesID: number

    @ApiProperty()
    RowSeat: number

    @ApiProperty()
    Seat: SeatDto


}



export interface SeatDto {


    tenGhe: string

    gia: number

    status: any

    stt: number

}




