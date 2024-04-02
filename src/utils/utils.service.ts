import { Injectable } from '@nestjs/common';
import { DUMMY_EMAIL_DOMAIN } from 'src/constants';

@Injectable()
export class UtilsService {
  capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  isDummyEmail(email: string): boolean {
    return email.endsWith(DUMMY_EMAIL_DOMAIN);
  }
}
