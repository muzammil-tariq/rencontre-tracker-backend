import { ApiProperty } from '@nestjs/swagger';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateVisitorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  employee: number;

  @ApiProperty()
  @IsString()
  nationalIdentificationNumber: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber(undefined, {
    message: 'Phone number must be in international format',
  })
  @IsMobilePhone()
  phoneNumber: string;
}
