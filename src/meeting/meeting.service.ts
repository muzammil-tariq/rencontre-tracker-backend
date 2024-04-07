import { Injectable } from '@nestjs/common';

import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingRepository } from './meeting.repository';

@Injectable()
export class MeetingService {
  constructor(private meetingRepository: MeetingRepository) {}

  create(createUserDto: CreateMeetingDto) {
    this.meetingRepository.insert(createUserDto);
  }

  async findAll() {
    return await this.meetingRepository.findAll();
  }
}
