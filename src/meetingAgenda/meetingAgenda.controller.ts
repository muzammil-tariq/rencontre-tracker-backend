import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateMeetingAgendaDto } from './dto/create-meetingAgenda.dto';
import { MeetingAgendaService } from './meetingAgenda.service';

@ApiBearerAuth()
@ApiTags('MeetingAgenda')
@Controller('meetingAgendas')
export class MeetingAgendaController {
  constructor(
    private readonly meetingAgendaService: MeetingAgendaService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Agenda created successfully',
  })
  @Post('/')
  async create(@Request() req, @Body() createUserDto: CreateMeetingAgendaDto) {
    return await this.meetingAgendaService.create(createUserDto);
  }

  @Get('/')
  async findUser() {
    return await this.meetingAgendaService.findAll();
  }
}
