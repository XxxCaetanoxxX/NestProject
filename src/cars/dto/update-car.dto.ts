import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto'
import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @ApiProperty({
        type: "array",
        description: 'Indicate the car\'s id',
    })
    @IsArray()
    @ArrayNotEmpty()
    ids?: number[]
}