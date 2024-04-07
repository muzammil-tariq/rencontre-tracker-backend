import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  visitorId: number;

  @ApiProperty()
  @IsDate()
  scheduledTime: Date;

  @ApiProperty()
  @IsNumber()
  meetingAgendaId: number;

  @ApiProperty()
  @IsNumber()
  description: string;
}
