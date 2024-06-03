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

  @OneToOne(() => Organization, (organization: Organization) => organization.id)
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('organizationId', 'visitors'),
    referencedColumnName: 'id',
    name: 'organizationId',
  })
  organization: Organization;

  @Column()
  organizationId: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
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
