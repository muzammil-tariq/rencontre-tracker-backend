import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { EmployeeManager } from './entities/employeeManager.entity';
import { CreateEmployeeManagerDto } from './dto/create-employeeManager.dto';

@Injectable()
export class EmployeeManagersRepository {
  constructor(
    @InjectRepository(EmployeeManager)
    private employeeManagerRepository: Repository<EmployeeManager>,
  ) {}

  async insert(
    payload: CreateEmployeeManagerDto,
    hostId: number,
  ): Promise<void> {
    await this.employeeManagerRepository.save({
      ...payload,
      hostId,
    });
  }

  async findAllByEmployees(id: number): Promise<EmployeeManager[]> {
    return await this.employeeManagerRepository.find({ where: { hostId: id } });
  }
  async getAllHosts(id: number): Promise<EmployeeManager[]> {
    return await this.employeeManagerRepository.find({
      where: { managerId: id },
      relations: ['host', 'manager'],
    });
  }
  async findOneByManagerId(id: number): Promise<EmployeeManager> {
    return await this.employeeManagerRepository.findOne({
      where: { managerId: id },
    });
  }
  async findByManagerAndHost(
    hostId: number,
    managerId: number,
  ): Promise<EmployeeManager> {
    return await this.employeeManagerRepository.findOne({
      where: { managerId, hostId },
      relations: ['host', 'manager'],
    });
  }
}
