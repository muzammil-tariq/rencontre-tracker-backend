import { Auth } from 'src/auth/entities/auth.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'employees',
})
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

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
