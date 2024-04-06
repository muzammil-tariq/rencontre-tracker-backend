import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { EmployeeManager } from './entities/employeeManager.entity';

@Injectable()
export class EmployeeManagersRepository {
  constructor(
    @InjectRepository(EmployeeManager)
    private employeeManagerRepository: Repository<EmployeeManager>,
  ) {}

  // async insert(user: CreateEmployeeDto): Promise<void> {
  //   await this.employeeManagerRepository.save(user);
  // }

  // async findByEmail(email: string): Promise<Employee | null> {
  //   return await this.employeeManagerRepository.findOne({ where: { email } });
  // }
  // async findUsersByEmails(emails: string[]): Promise<Employee[] | null> {
  //   return await this.employeeManagerRepository.find({ where: { email: In(emails) } });
  // }

  // async update(email: string, user: Employee): Promise<void> {
  //   await this.employeeManagerRepository.update({ email }, user);
  // }

  // remove(email: string) {
  //   return this.employeeManagerRepository.delete({ email });
  // }
}
