import { IsNotEmpty, IsString, MinLength, Matches, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class SignInDto {
    @ApiProperty()
    @IsString({ message: "name must be string" })
    @MinLength(3, { message: "name must contain at least 3 characters" })
    @IsNotEmpty({ message: "name can't be empty" })
    name: string;

    @ApiProperty()
    @IsString({ message: "password must be string" })
    @MinLength(4, { message: "password must contain at least 4 characters" })
    @Matches(/.*\d.*/, { message: "password must contain at least 1 number" }) //estudar essa linha
    @IsNotEmpty({ message: "password can't be empty" })
    password: string
}