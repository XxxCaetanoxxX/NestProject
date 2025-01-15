import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class FindOneUserDto {
    @ApiProperty()
    @IsInt()
    id: number;
}