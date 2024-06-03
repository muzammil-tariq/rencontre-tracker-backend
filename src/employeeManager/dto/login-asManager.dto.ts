import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LoginAsManagerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hostId: number;
}
