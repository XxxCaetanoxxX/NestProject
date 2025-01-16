import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class UpdateManyCarsDto {
  @ApiProperty({ type: 'number', isArray: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true }) //vai percorrer o array e verificar um por um para ver se eles sao inteiros
  ids?: number[];

  @ApiProperty({
    type: Boolean,
    description: 'Indicate if the car is stocked',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isStocked: boolean = false;
}
