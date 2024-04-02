import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    this.userRepository.insert(createUserDto);
  }

  async findUser(email: string) {
    return await this.userRepository.findByEmail(email);
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
