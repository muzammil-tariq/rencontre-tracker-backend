import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'employee_managers',
})
export class EmployeeManager {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({
    unique: true,
  })
  @OneToOne(() => Employee, (employee: Employee) => employee.id)
  employeeId: number;

  @OneToOne(() => Employee, (employee: Employee) => employee.id)
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
