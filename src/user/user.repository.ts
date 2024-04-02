import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async insert(user: CreateUserDto): Promise<void> {
    await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async findUsersByEmails(emails: string[]): Promise<User[] | null> {
    return await this.userRepository.find({ where: { email: In(emails) } });
  }

  async update(email: string, user: User): Promise<void> {
    await this.userRepository.update({ email }, user);
  }

  remove(email: string) {
    return this.userRepository.delete({ email });
  }
}
