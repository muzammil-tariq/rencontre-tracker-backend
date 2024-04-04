import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UserController } from './employee.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { EmployeeRepository } from './employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [CoreModule, AuthModule, TypeOrmModule.forFeature([Employee])],
  controllers: [UserController],
  providers: [EmployeeRepository, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
