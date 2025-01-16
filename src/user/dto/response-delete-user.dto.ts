import { ApiProperty } from '@nestjs/swagger';

export class ResponseDeleteUserDto {
  @ApiProperty({ description: 'message' })
  message: string;
}
