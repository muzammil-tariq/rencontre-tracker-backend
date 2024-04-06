import { Module } from '@nestjs/common';
import { MeetingAgendaController } from './meetingAgenda.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingAgenda } from './entities/meetingAgenda.entity';
import { MeetingAgendaService } from './meetingAgenda.service';
import { MeetingAgendaRepository } from './meetingAgenda.repository';

@Module({
  imports: [CoreModule, AuthModule, TypeOrmModule.forFeature([MeetingAgenda])],
  controllers: [MeetingAgendaController],
  providers: [MeetingAgendaRepository, MeetingAgendaService],
  exports: [MeetingAgendaService],
})
export class MeetingAgendaModule {}
