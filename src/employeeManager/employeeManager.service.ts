import { Injectable } from '@nestjs/common';
import { EmployeeManagersRepository } from './employeeManager.repository';

@Injectable()
export class EmployeeManagerService {
  constructor(private employeeManagersRepository: EmployeeManagersRepository) {}

  // create(createUserDto: CreateEmployeeDto) {
  //   this.employeeManagersRepository.insert(createUserDto);
  // }

  // async findUser(email: string) {
  //   return await this.employeeManagersRepository.findByEmail(email);
  // }
  // async findUsersByEmails(emails: string[]) {
  //   return await this.employeeManagersRepository.findUsersByEmails(emails);
  // }

  // async remove(email: string) {
  //   // disable delete user functionlity for now
  //   // const data = await this.employeeManagersRepository.remove(email);
  //   // await this.authService.remove(email);
  //   // return data;

  //   return this.employeeManagersRepository.remove(email);
  // }
}
