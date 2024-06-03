import { foriengnKeyName } from 'src/constants';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'employee_managers',
})
// @Index(['hostId', 'managerId'], {
//   unique: true,
// })
export class EmployeeManager {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Employee, (employee: Employee) => employee.id, {
    nullable: true,
  })
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('hostId', 'employee_managers'),
    referencedColumnName: 'id',
    name: 'hostId',
  })
  host: Employee;

  @Column()
  hostId: number;

  @ManyToOne(() => Employee, (employee: Employee) => employee.id, {
    nullable: true,
  })
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('managerId', 'employee_managers'),
    referencedColumnName: 'id',
    name: 'managerId',
  })
  manager: Employee;

  @Column()
  managerId: number;

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
