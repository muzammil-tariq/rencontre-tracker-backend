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
  hostId: number;

  @ApiProperty()
  @IsNumber()
  nationalIdentificationNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsPhoneNumber(undefined, {
    message: 'Phone number must be in international format',
  })
  @IsMobilePhone()
  phoneNumber: string;
}
