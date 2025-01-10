import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class FindAllCarsDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number) //tenta converter string para numero
    @Min(5)
    @Max(50)
    limit: number = 10;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset: number = 0;
}