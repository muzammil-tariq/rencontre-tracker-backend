import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-meetingAgenda.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async insert(agenda: CreateOrganizationDto): Promise<Organization> {
    return await this.organizationRepository.save(agenda);
  }

  async findById(id: number): Promise<Organization | null> {
    return await this.organizationRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find();
  }
}
