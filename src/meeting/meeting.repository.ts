import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingRepository {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  async insert(agenda: CreateMeetingDto): Promise<Meeting> {
    return await this.meetingRepository.save(agenda);
  }

  async findById(id: number): Promise<Meeting | null> {
    return await this.meetingRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<Meeting[]> {
    return await this.meetingRepository.find();
  }
}
