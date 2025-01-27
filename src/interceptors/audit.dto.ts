import { IsOptional, IsDate, IsNumber } from 'class-validator';

export class AuditDto {
  @IsOptional()
  @IsNumber()
  userCreatorId?: number;

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
}