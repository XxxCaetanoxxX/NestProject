import { ApiProperty } from '@nestjs/swagger';

export class FindOneUserDto {
  @ApiProperty()
  id: number;
}
