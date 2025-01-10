import{ ApiProperty } from '@nestjs/swagger'

export class ResponseDeleteCarDto {
    @ApiProperty({ description: 'message' })
    message: string;
  }