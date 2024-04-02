import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: any;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.applicationDefault(),
    });
  }
  async validate(token: string) {
    const firebaseUser: any = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return {
      id: firebaseUser.user_id,
      email: firebaseUser.email,
      provider: firebaseUser.firebase.sign_in_provider,
      name: firebaseUser.name,
      isFirebasePayload: true,
    };
  }
}

export interface AuthTempParams {
  provider: string;
  isFirebasePayload: boolean;
  oldPublickKey: string;
}
