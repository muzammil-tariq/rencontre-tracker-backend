import { Injectable } from '@nestjs/common';

import { MeetingAgendaRepository } from './meetingAgenda.repository';
import { CreateMeetingAgendaDto } from './dto/create-meetingAgenda.dto';

@Injectable()
export class MeetingAgendaService {
  constructor(private meetingAgendaRepository: MeetingAgendaRepository) {}

  create(createUserDto: CreateMeetingAgendaDto) {
    this.meetingAgendaRepository.insert(createUserDto);
  }

  async findAll() {
    return await this.meetingAgendaRepository.findAll();
  }
}
