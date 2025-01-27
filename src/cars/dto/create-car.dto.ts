import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { AuditDto } from 'src/interceptors/audit.dto';

export class CreateCarDto extends AuditDto{
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty({
    type: Boolean,
    description: 'Indicate if the car is stocked',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isStocked: boolean = false;
}
