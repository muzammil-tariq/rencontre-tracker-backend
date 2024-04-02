import { Auth } from 'src/auth/entities/auth.entity';
import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    unique: true,
  })
  @OneToOne(() => Auth, (auth: Auth) => auth.email)
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: null, nullable: true })
  phoneNumber: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate: Date;

  @Column({ default: null, nullable: true })
  socialStatus: string;

  @Column({ default: null, nullable: true })
  gender: string;

  @Column({ default: null, nullable: true })
  address: string;

  @Column({ default: null, nullable: true })
  city: string;

  @Column({ default: null, nullable: true })
  country: string;

  @Column({ default: null, nullable: true })
  state: string;

  @Column({ default: null, nullable: true })
  zip: string;

  @Column({
    default: null,
    nullable: true,
  })
  profileImage: string;

  @Column({
    default: false,
  })
  isDead?: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  isAffiliate?: boolean;

  @Column({
    nullable: true,
    default: true,
  })
  isLegalSuiteEnabled?: boolean;

  @Column({
    default: false,
  })
  deathSequenceInitiated?: boolean;
}
