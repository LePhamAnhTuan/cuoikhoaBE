import { ApiProperty } from "@nestjs/swagger"

export class SeatDTO {
    @ApiProperty()
    tenGhe: string
    @ApiProperty()
    gia: number
    @ApiProperty()
    sttSeat: number
    @ApiProperty()
    userId: string
    @ApiProperty()
    status: boolean
    @ApiProperty()
    rowSeat: string

}