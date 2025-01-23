import { IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;
}
