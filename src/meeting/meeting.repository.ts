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
  async createMeeting(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const meeting = this.meetingRepository.create(createMeetingDto);
    return this.meetingRepository.save(meeting);
  }

  async findAllMeetings(): Promise<Meeting[]> {
    return this.meetingRepository.find();
  }

  async findOneMeeting(id: number): Promise<Meeting> {
    return this.meetingRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findMeetingsByHostId(hostId: number): Promise<Meeting[]> {
    return this.meetingRepository
      .createQueryBuilder('meeting')
      .where('meeting.hostId = :hostId', { hostId })
      .orderBy('meeting.dateTime', 'ASC')
      .getMany();
  }
}
