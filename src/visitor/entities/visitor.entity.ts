import { Auth } from 'src/auth/entities/auth.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'visitors',
})
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({
    unique: true,
  })
  @OneToOne(() => Employee, (employee: Employee) => employee.id, {
    nullable: true,
  })
  @JoinColumn()
  employee: number;

  // @OneToOne(() => Employee, (employee: Employee) => employee.id, {
  //   nullable: true,
  // })
  // @JoinColumn()
  // organization: number;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  nationalIdentificationNumber: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}
