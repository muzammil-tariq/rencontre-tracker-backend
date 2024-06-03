import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from './entities/visitor.entity';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { ORGANIZATION_ID } from 'src/constants';

@Injectable()
export class VisitorRepository {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
  ) {}

  async insert(agenda: CreateVisitorDto): Promise<Visitor> {
    return await this.visitorRepository.save({
      ...agenda,
      organizationId: ORGANIZATION_ID,
    });
  }

  async findById(id: number): Promise<Visitor | null> {
    return await this.visitorRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<Visitor[]> {
    return await this.visitorRepository.find();
  }
}
