import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetingAgendaDto } from './dto/create-meetingAgenda.dto';
import { MeetingAgenda } from './entities/meetingAgenda.entity';

@Injectable()
export class MeetingAgendaRepository {
  constructor(
    @InjectRepository(MeetingAgenda)
    private meetingAgendaRepository: Repository<MeetingAgenda>,
  ) {}

  async insert(agenda: CreateMeetingAgendaDto): Promise<MeetingAgenda> {
    return await this.meetingAgendaRepository.save(agenda);
  }

  async findById(id: number): Promise<MeetingAgenda | null> {
    return await this.meetingAgendaRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<MeetingAgenda[]> {
    return await this.meetingAgendaRepository.find();
  }
}
