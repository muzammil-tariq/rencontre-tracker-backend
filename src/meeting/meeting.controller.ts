import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { MeetingService } from './meeting.service';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meeting' })
  @ApiResponse({
    status: 201,
    description: 'The meeting has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingService.create(createMeetingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meetings' })
  @ApiResponse({ status: 200, description: 'Return all meetings.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(): Promise<Meeting[]> {
    return this.meetingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meeting by ID' })
  @ApiResponse({ status: 200, description: 'Return a meeting.' })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  async findOne(@Param('id') id: number): Promise<Meeting> {
    return this.meetingService.findOne(id);
  }
}
