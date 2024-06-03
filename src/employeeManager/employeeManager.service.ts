import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeManagersRepository } from './employeeManager.repository';
import { CreateEmployeeManagerDto } from './dto/create-employeeManager.dto';
import * as firebase from 'firebase-admin';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EmployeeManagerService {
  constructor(
    private employeeManagersRepository: EmployeeManagersRepository,
    private authService: AuthService,
  ) {}

  create(createUserDto: CreateEmployeeManagerDto, hostId: number) {
    this.employeeManagersRepository.insert(createUserDto, hostId);
  }

  async findAllByHostId(id: number) {
    return await this.employeeManagersRepository.findAllByEmployees(id);
  }
  async getAllHosts(id: number) {
    return await this.employeeManagersRepository.getAllHosts(id);
  }
  async findOneByManagerId(id: number) {
    return await this.employeeManagersRepository.findOneByManagerId(id);
  }
  async findByManagerAndHost(hostId: number, managerId: number) {
    return await this.employeeManagersRepository.findByManagerAndHost(
      hostId,
      managerId,
    );
  }
  async loginAsManager(hostId: number, managerId: number) {
    const hostManager = await this.findByManagerAndHost(hostId, managerId);
    const auth = await this.authService.getByEmail(hostManager.host.email);
    if (!hostManager) throw new NotFoundException('Host Manager not found');
    const claims = {
      managerId,
      managerEmail: hostManager.manager.email,
    };

    return firebase.auth().createCustomToken(auth.id, claims);
  }
}
