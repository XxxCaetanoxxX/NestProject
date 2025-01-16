import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min, minLength } from "class-validator";

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
    // @Type(() => Boolean) não funciona
    @Transform(({ value }) => value === 'true' || value == true) //transforma a string em valores booleanos
    //pega o valor. se o valor foi igual a string 'true' ou o boolean true, retorna true.
    //caso contrario, retorna false
    isStocked?: boolean

    @ApiPropertyOptional({
        type: "array",
        description: 'Indicate the car\'s id',
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @Transform(({ value }) => (typeof value === 'string') ? value.split(',').map(Number) : value)
    ids?: number[]
}