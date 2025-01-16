import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { ResponseCarDto } from 'src/cars/dto/response-car.dto';

export class ResponseUserDto {
  @ApiProperty({ description: 'user id' })
  id: string;

  @ApiProperty({ description: 'user name' })
  name: string;

  @ApiProperty({ description: 'user password' })
  password: string;

  @ApiProperty({ enum: Profile, enumName: 'ADMIN' })
  profile: Profile;

  @ApiProperty({ description: 'User car list', type: [ResponseCarDto] })
  cars: ResponseCarDto[];
}
