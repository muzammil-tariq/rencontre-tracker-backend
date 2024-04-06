import { Auth } from 'src/auth/entities/auth.entity';
import { foriengnKeyName } from 'src/constants';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'employees',
})
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Auth, (auth: Auth) => auth.id)
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('authId', 'employees'),
    referencedColumnName: 'id',
    name: 'authId',
  })
  auth: Auth;

  @Column()
  authId: number;

  @OneToOne(() => Organization, (organization: Organization) => organization.id)
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('organizationId', 'employees'),
    referencedColumnName: 'id',
    name: 'organizationId',
  })
  organization: Organization;

  @Column()
  organizationId: number;

  @Column()
  firstName: string;

  @Column()
  email: string;

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
  zipCode: string;

  @Column({
    default: null,
    nullable: true,
  })
  profileImage: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  joinedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}
