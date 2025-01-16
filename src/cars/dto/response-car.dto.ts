import { ApiProperty } from '@nestjs/swagger';
export class ResponseCarDto {
  @ApiProperty({ description: 'car id' })
  id: string;

  @ApiProperty({ description: 'car name' })
  name: string;

  @ApiProperty({ description: 'car userId' })
  userId: string;
}
