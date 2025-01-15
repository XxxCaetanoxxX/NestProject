import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, Max, Min } from "class-validator";

export class FindAllCarsDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Type(() => Number) //tenta converter string para numero
    @Min(5)
    @Max(50)
    limit?: number = 10;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset?: number = 0;

    @ApiPropertyOptional({
        type: Boolean,
        description: 'Indicate if the car is stocked',
    })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isStocked?: boolean
}