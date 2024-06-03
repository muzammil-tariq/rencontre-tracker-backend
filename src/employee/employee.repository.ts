import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async insert(user: CreateEmployeeDto): Promise<void> {
    await this.employeeRepository.save(user);
  }

  async findByEmail(
    email: string,
    relations: string[] = [],
  ): Promise<Employee | null> {
    return await this.employeeRepository.findOne({
      where: { email },
      relations,
    });
  }
  async findUsersByEmails(emails: string[]): Promise<Employee[] | null> {
    return await this.employeeRepository.find({ where: { email: In(emails) } });
  }

  async update(email: string, user: Employee): Promise<void> {
    await this.employeeRepository.update({ email }, user);
  }

  remove(email: string) {
    return this.employeeRepository.delete({ email });
  }
}
