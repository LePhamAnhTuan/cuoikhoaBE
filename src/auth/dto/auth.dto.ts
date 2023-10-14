import { ApiProperty } from "@nestjs/swagger"

export type UserInfoDto = {

    UserId: number
    Email: string,
    Password: string,
    Username: string,

}

export class UserLoginDto {
    @ApiProperty({ required: true })
    Email: string

    @ApiProperty({ required: true })
    Password: string
}
export class SignUpDto {


    @ApiProperty({ type: 'string', required: true })
    Email: string

    @ApiProperty({ type: 'string', required: true })
    Password: string

    @ApiProperty({ required: false })
    Username: string

    @ApiProperty({ required: false })
    Age: number

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    avatar: string

    @ApiProperty({ type: 'string', required: true, enum: ['USER', 'ADMIN'] })
    role: string


}
