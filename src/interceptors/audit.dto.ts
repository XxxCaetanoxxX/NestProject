import { IsOptional, IsDate, IsNumber } from 'class-validator';

export class AuditDto {
  @IsDate()
  @IsOptional()
  creationDate?: Date;

  @IsDate()
  @IsOptional()
  updateDate?: Date;

  @IsNumber()
  @IsOptional()
  version?: number = 1

  @IsNumber()
  @IsOptional()
  createdById: number

  @IsNumber()
  @IsOptional()
  updatedById?: number
}