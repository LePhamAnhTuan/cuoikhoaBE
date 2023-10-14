import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty()
    UserID: number

    @ApiProperty()
    Username: string

    @ApiProperty()
    Email: string

    @ApiProperty()
    Password: string
}
