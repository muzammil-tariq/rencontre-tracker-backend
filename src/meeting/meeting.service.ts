import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { MeetingRepository } from './meeting.repository';

@Injectable()
export class MeetingService {
  constructor(private readonly meetingRepository: MeetingRepository) {}

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingRepository.createMeeting(createMeetingDto);
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetingRepository.findAllMeetings();
  }

  async findOne(id: number): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOneMeeting(id);
    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }
    return meeting;
  }

  // async update(
  //   id: number,
  //   updateMeetingDto: UpdateMeetingDto,
  // ): Promise<Meeting> {
  //   const meeting = await this.meetingRepository.preload({
  //     id,
  //     ...updateMeetingDto,
  //   });
  //   if (!meeting) {
  //     throw new NotFoundException(`Meeting with ID ${id} not found`);
  //   }
  //   return this.meetingRepository.save(meeting);
  // }

  // async remove(id: number): Promise<void> {
  //   const meeting = await this.findOne(id);
  //   await this.meetingRepository.remove(meeting);
  // }
}
