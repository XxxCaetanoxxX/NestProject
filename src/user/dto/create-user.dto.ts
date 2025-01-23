import { IsNotEmpty, IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Profile } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({})
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Profile })
  @IsEnum(Profile)
  profile: Profile;

  @IsOptional()
  @IsNumber()
  userCreatorId?: number;

  @IsDate()
  @IsOptional()
  creationDate?: Date;
}
