import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';

import { MeetingService } from './meeting.service';

@ApiBearerAuth()
@ApiTags('Meetings')
@Controller('meetings')
export class MeetingController {
  constructor(
    private readonly meetingAgendaService: MeetingService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Agenda created successfully',
  })
  @Post('/')
  async create(@Request() req, @Body() createUserDto: CreateMeetingDto) {
    return await this.meetingAgendaService.create(createUserDto);
  }

  @Get('/')
  async findUser() {
    return await this.meetingAgendaService.findAll();
  }
}
