import { foriengnKeyName } from 'src/constants';
import { Employee } from 'src/employee/entities/employee.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'visitors',
})
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Employee, (employee: Employee) => employee.id, {
    nullable: true,
  })
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('employeeId', 'visitors'),
    referencedColumnName: 'id',
    name: 'employeeId',
  })
  employee: Employee;

  @Column({ nullable: true })
  employeeId: number;

  @OneToOne(() => Organization, (organization: Organization) => organization.id)
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('organizationId', 'visitors'),
    referencedColumnName: 'id',
    name: 'organizationId',
  })
  organization: Organization;

  @Column()
  organizationId: number;

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
