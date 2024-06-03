import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmployeeManagerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  managerId: number;
}
