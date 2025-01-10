import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCarDto {
    @ApiProperty()
    @IsString({ message: "name must be a string" })
    @MinLength(2, { message: "name must to have more than 2 characters" })
    @IsNotEmpty({ message: "name can't be empaty" })
    name: string;

    @ApiProperty()
    @IsString({ message: "must be a user id string" })
    @MinLength(15, { message: "the id must have at least 15 characters" })
    @IsNotEmpty({ message: "id can't be empaty" })
    userId: string;
}