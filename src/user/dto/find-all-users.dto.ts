import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { Profile } from "@prisma/client";

export class FindAllUsersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number) //tenta voncerter string para numero
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
    description: 'Filter by name, min 3 characters',
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;


  @ApiPropertyOptional({
    enum: Profile
  })
  @IsOptional()
  @IsEnum(Profile)
  profile?: Profile
}