import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsAlpha,
  IsDate,
  IsMobilePhone,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxDate,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  file: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber(undefined, {
    message: 'Phone number must be in international format',
  })
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(new Date())
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  socialStatus: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zip: string;

  profileImage: string;
}
