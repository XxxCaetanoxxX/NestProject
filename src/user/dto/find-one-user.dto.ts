import { IsString, Length } from 'class-validator';

export class FindOneUserDto {
    @IsString()
    @Length(24, 24, { message: 'The ID must have exactly 24 characters.' })
    id: string;
}