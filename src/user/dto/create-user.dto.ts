import { IsNotEmpty, IsString, MinLength, Matches, IsEnum } from "class-validator";
import { Profile } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: "name cmust be a string" })
  @MinLength(3, { message: "name must have at least 3 characters" })
  @IsNotEmpty({ message: "name cant be empaty" })
  name: string;

  @ApiProperty({})
  @IsString({ message: "password must be a string" })
  @MinLength(4, { message: "password must have at least 4 characters" })
  @Matches(/.*\d.*/, { message: "password must have at least one special character" }) //estudar essa linha
  @IsNotEmpty({ message: "password cant be empaty" })
  password: string;

  @ApiProperty({enum: Profile})
  @IsNotEmpty({ message: "profile cant be empaty" })
  @IsEnum(Profile, { message: "profile must be DEFAULT, MANAGER or ADMIN" })
  profile: Profile;
}