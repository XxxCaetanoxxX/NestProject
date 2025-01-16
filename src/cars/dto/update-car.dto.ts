import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @ApiPropertyOptional({ type: 'number', isArray: true })
  @IsArray()
  @ArrayNotEmpty()
  ids?: number[];
}
