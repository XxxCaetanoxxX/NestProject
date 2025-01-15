import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Length } from 'class-validator';

export class FindOneUserDto {
    @ApiProperty()
    id: number;
}