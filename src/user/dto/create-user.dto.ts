import { IsNotEmpty, IsString, MinLength, Matches, IsEnum } from "class-validator";
import { Profile } from "@prisma/client";

export class CreateUserDto {
  @IsString({ message: "name cmust be a string" })
  @MinLength(3, { message: "name must have at least 3 characters" })
  @IsNotEmpty({ message: "name cant be empaty" })
  name: string;

  @IsString({ message: "password must be a string" })
  @MinLength(4, { message: "password must have at least 4 characters" })
  @Matches(/.*\d.*/, { message: "password must have at least one special character" }) //estudar essa linha
  @IsNotEmpty({ message: "password cant be empaty" })
  password: string;

  @IsNotEmpty({ message: "profile cant be empaty" })
  @IsEnum(Profile, { message: "profile must be DEFAULT, MANAGER or ADMIN" })
  profile: Profile;
}