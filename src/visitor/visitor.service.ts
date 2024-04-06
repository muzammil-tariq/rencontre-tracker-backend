import { Injectable } from '@nestjs/common';

import { CreateVisitorDto } from './dto/create-visitor.dto';
import { VisitorRepository } from './visitor.repository';

@Injectable()
export class VisitorService {
  constructor(private visitorRepository: VisitorRepository) {}

  async create(createUserDto: CreateVisitorDto) {
    this.visitorRepository.insert(createUserDto);
  }

  async findAll() {
    return await this.visitorRepository.findAll();
  }
}
