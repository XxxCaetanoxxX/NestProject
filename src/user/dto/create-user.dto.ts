import { IsNotEmpty, IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Profile } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AuditDto } from 'src/interceptors/audit.dto';

export class CreateUserDto extends AuditDto{
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({})
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Profile })
  @IsEnum(Profile)
  profile: Profile;
}
