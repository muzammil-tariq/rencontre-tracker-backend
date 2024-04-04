import { Injectable } from '@nestjs/common';

import * as firebase from 'firebase-admin';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/auth.entity';
import { AuthTempParams } from './strategies/firebase-auth.strategy';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async getById(id: string) {
    return await this.authRepository.findById(id);
  }

  async getByEmail(email: string, relations?: string[]) {
    email = email?.toLowerCase().trim();
    return await this.authRepository.findByEmail(email, relations);
  }

  async login(userAuth: Auth & Partial<AuthTempParams>) {
    return userAuth;
  }
  async signup(payload: CreateAuthDto) {
    let firebaseUid: string;
    let createdAuth;
    const auth = await this.authRepository.findByEmail(payload.email);
    if (!auth) {
      const firebaseUser = await this.createOrGetFirebaseUser(payload);
      createdAuth = await this.authRepository.insert(firebaseUser.uid, payload);
      firebaseUid = firebaseUser.uid;
    } else {
      firebaseUid = auth.id;
    }
    // Generate a custom token for the Firebase UID
    const firebaseToken = await firebase.auth().createCustomToken(firebaseUid);
    return createdAuth;
  }

  async findByDateRange(date1: Date, date2: Date) {
    return await this.authRepository.findByDateRange(date1, date2);
  }
  async findByDate(date: Date) {
    return await this.authRepository.findByDate(date);
  }

  async remove(email: string) {
    return await this.authRepository.remove(email);
  }
  // async getToken(address: string) {
  //   let firebaseUid: string;
  //   const auth = await this.authRepository.findByErc20Address(address);
  //   if (!auth) {
  //     const firebaseUser = await this.createOrGetFirebaseUser(
  //       DUMMY_EMAIL(address),
  //       address,
  //     );
  //     firebaseUid = firebaseUser.uid;
  //   } else {
  //     firebaseUid = auth.id;
  //   }

  //   // Generate a custom token for the Firebase UID
  //   const firebaseToken = await firebase.auth().createCustomToken(firebaseUid);
  //   return firebaseToken;
  // }
  async createOrGetFirebaseUser(payload: CreateAuthDto) {
    try {
      const user = await firebase.auth().getUserByEmail(payload.email);
      if (!user) {
        return this.createFirebaseUser(payload);
      }
      return user;
    } catch (error) {
      if (error.errorInfo.code.includes('auth/user-not-found')) {
        return this.createFirebaseUser(payload);
      }
      throw error;
    }
  }
  async createFirebaseUser(payload: CreateAuthDto) {
    const newUser = await firebase.auth().createUser({
      email: payload.email,
      displayName: payload.firstName + ' ' + payload.lastName,
      password: payload.password,
    });
    return newUser;
  }
}
