import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';

import { CommonModule } from './common/common.module';
import { EmployeeModule } from './employee/employee.module';
import { UtilsModule } from './utils/utils.module';
import { EmployeeManagerModule } from './employeeManager/employee.module';
import { VisitorModule } from './visitor/visitor.module';
import { MeetingAgendaModule } from './meetingAgenda/meetingAgenda.module';
import { OrganizationModule } from './organization/organization.module';
import { MeetingModule } from './meeting/meetingAgenda.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    EmployeeModule,
    EmployeeManagerModule,
    AuthModule,
    VisitorModule,
    MeetingAgendaModule,
    EventEmitterModule.forRoot(),
    OrganizationModule,
    CommonModule,
    MeetingModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
