import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';

import { Employee } from 'src/employee/entities/employee.entity';

import { Between, FindOneOptions, Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { Provider } from './entities/provider.entity';
import { UtilsService } from 'src/utils/utils.service';
import { CreateAuthDto } from './dto/create-auth.dto';
@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private utils: UtilsService,
  ) {}

  async findByEmail(email: string, relations?: string[]): Promise<Auth | null> {
    const _query: FindOneOptions<Auth> = {
      where: {
        email,
      },
    };
    if (relations && relations.length > 0) _query.relations = relations;
    return await this.authRepository.findOne(_query);
  }

  async findById(id: string): Promise<Auth | null> {
    return await this.authRepository.findOne({ where: { id } });
  }

  async insert(id: string, payload: CreateAuthDto) {
    const authProps: Partial<Auth> = {
      id,
      email: payload.email,
      createdAt: new Date(),
    };

    const auth = this.authRepository.create(authProps);
    await this.authRepository.insert(auth);
    this.employeeRepository.save({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
    return auth;
  }

  async update(email: string, auth: Partial<Auth>): Promise<void> {
    await this.authRepository.update({ email }, auth);
  }

  async addProvider(authId: string, name: string) {
    const provider = await this.providerRepository.findOne({
      where: { authId, name },
    });
    if (!provider) {
      const providerPayload = this.providerRepository.create({
        name,
        authId,
      });
      return await this.providerRepository.insert(providerPayload);
    }
    return provider;
  }

  async findByDateRange(date1: Date, date2: Date) {
    return this.authRepository.find({
      where: {
        createdAt: Between(date2, date1),
      },
    });
  }
  async findByDate(date: Date) {
    // find auth by date exclusive of it's time
    return await this.authRepository
      .createQueryBuilder('auth')
      .where(`DATE_TRUNC('day', "joinedAt") = :date`, {
        date: dayjs(date).format('YYYY-MM-DD'),
      })
      .getMany();
  }

  async remove(email: string) {
    return this.authRepository.delete({
      email,
    });
  }
}
