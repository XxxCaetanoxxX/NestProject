import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min} from "class-validator";

export class FindAlLCarsDto{
    @IsOptional()
    @IsInt()
    @Type(()=>Number) //tenta converter string para numero
    @Min(5)
    @Max(50)
    limit: number;

    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    @Min(0)
    offset:number;
}