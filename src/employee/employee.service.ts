import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private userRepository: EmployeeRepository) {}

  create(createUserDto: CreateEmployeeDto) {
    this.userRepository.insert(createUserDto);
  }

  async findUser(email: string, relations: string[] = []) {
    return await this.userRepository.findByEmail(email, relations);
  }
  async findUsersByEmails(emails: string[]) {
    return await this.userRepository.findUsersByEmails(emails);
  }

  async remove(email: string) {
    // disable delete user functionlity for now
    // const data = await this.userRepository.remove(email);
    // await this.authService.remove(email);
    // return data;

    return this.userRepository.remove(email);
  }
}
