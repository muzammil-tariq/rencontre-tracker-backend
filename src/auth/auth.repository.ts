import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from 'src/user/entities/user.entity';
import { Between, FindOneOptions, Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { Provider } from './entities/provider.entity';
import { UtilsService } from 'src/utils/utils.service';
@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  // async insert(
  //   id: string,
  //   email: string,
  //   stripeId: string,
  //   firstName: string,
  //   lastName: string,
  //   isAffiliate?: boolean,
  //   isLegalSuiteEnabled?: boolean,
  // ) {
  //   const authProps: Partial<Auth> = {
  //     id,
  //     stripeCustomerId: stripeId,
  //     email,
  //     lastLogin: new Date(),
  //     joinedAt: new Date(),
  //   };
  //   if (this.utils.isDummyEmail(email))
  //     authProps.erc20Address = email.split('@')[0].trim();
  //   const auth = this.authRepository.create(authProps);
  //   await this.authRepository.insert(auth);
  //   this.userRepository.save({
  //     email,
  //     firstName,
  //     lastName,
  //     isAffiliate,
  //     isLegalSuiteEnabled,
  //   });
  //   return auth;
  // }

  async update(email: string, auth: Partial<Auth>): Promise<void> {
    await this.authRepository.update({ email }, auth);
  }

  // async updateLastLogin(id: string) {
  //   const auth = await this.authRepository.findOne({ where: { id } });
  //   if (!auth) {
  //     throw new Error('User not found');
  //   }
  //   auth.lastLogin = new Date();
  //   await this.authRepository.save(auth);
  // }

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
        joinedAt: Between(date2, date1),
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