import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsString({ message: 'name must be a string' })
  @MinLength(2, { message: 'name must to have more than 2 characters' })
  @IsNotEmpty({ message: "name can't be empty" })
  name: string;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty({
    type: Boolean,
    description: 'Indicate if the car is stocked',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isStocked: boolean = false;
}
