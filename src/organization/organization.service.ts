import { Injectable } from '@nestjs/common';

import { CreateOrganizationDto } from './dto/create-meetingAgenda.dto';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async create(createUserDto: CreateOrganizationDto) {
    this.organizationRepository.insert(createUserDto);
  }

  async findAll() {
    return await this.organizationRepository.findAll();
  }
}
