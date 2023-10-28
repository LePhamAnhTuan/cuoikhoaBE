import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {

    @ApiProperty()
    MovieTitle: string

    @ApiProperty()
    ReleaseDate: Date

    @ApiProperty()
    Genre: string

    @ApiProperty()
    Duration: number

    @ApiProperty()
    Description: string

    @ApiProperty()
    MovieImage: string
}
