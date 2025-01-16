import { ApiProperty } from "@nestjs/swagger";
import { Allow, ArrayContains, ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateManyCarsDto {
    @ApiProperty({ type: 'number', isArray: true, })
    @IsArray()
    @ArrayNotEmpty()
    ids?: number[]

    @ApiProperty({
        type: Boolean,
        description: 'Indicate if the car is stocked',
        default: false
    })
    @IsNotEmpty()
    @IsBoolean()
    isStocked: boolean = false
}