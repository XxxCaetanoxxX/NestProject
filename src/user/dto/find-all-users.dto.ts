import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class FindAllUsersDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Type(() => Number) //tenta voncerter string para numero
    @Min(5)
    @Max(50)
    limit: number = 10;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset: number = 0;
}