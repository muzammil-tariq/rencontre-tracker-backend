import { Module, forwardRef } from '@nestjs/common';
import { EmployeeManagerService } from './employeeManager.service';
import { UserController } from './employee.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { EmployeeManagersRepository } from './employeeManager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeManager } from './entities/employeeManager.entity';

@Module({
  imports: [
    CoreModule,

    TypeOrmModule.forFeature([EmployeeManager]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [EmployeeManagersRepository, EmployeeManagerService],
  exports: [EmployeeManagerService],
})
export class EmployeeManagerModule {}
