export const ALTERNATIVE_USER_NAME = 'Legacy User'; // use when user not provid it's name (mostly used inside sendgrid emails)
export const DEFAULT_PORT = 3000;
export const DUMMY_EMAIL_DOMAIN = 'dummy.rencontre.com';
export const DUMMY_EMAIL = (address: string) =>
  `${address}@${DUMMY_EMAIL_DOMAIN}`;
