import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto'
import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @ApiPropertyOptional({ type: 'number', isArray: true })
    @IsArray()
    @ArrayNotEmpty()
    ids?: number[]
}