export const ALTERNATIVE_USER_NAME = 'Legacy User'; // use when user not provid it's name (mostly used inside sendgrid emails)
export const DEFAULT_PORT = 3000;
export const DUMMY_EMAIL_DOMAIN = 'dummy.rencontre.com';
export const DUMMY_EMAIL = (address: string) =>
  `${address}@${DUMMY_EMAIL_DOMAIN}`;
export const foriengnKeyName = (columnName: string, tableName: string) =>
  `FK_${columnName}_${tableName}`;

export const ORGANIZATION_ID = 2;
