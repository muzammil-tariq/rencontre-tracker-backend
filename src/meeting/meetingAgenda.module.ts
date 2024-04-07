import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { MeetingController } from './meeting.controller';
import { MeetingRepository } from './meeting.repository';
import { MeetingService } from './meeting.service';

@Module({
  imports: [CoreModule, AuthModule, TypeOrmModule.forFeature([Meeting])],
  controllers: [MeetingController],
  providers: [MeetingRepository, MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
