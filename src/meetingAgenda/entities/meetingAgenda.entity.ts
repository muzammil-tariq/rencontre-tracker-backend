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
  name: 'meeting_agendas',
})
export class MeetingAgenda {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => Organization,
    (organization: Organization) => organization.id,
    { nullable: true },
  )
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName(
      'organizationId',
      'meeting_agendas',
    ),
    referencedColumnName: 'id',
    name: 'organizationId',
  })
  organization: Organization;

  @Column()
  organizationId: number;

  @Column()
  name: string;

  @Column()
  description: string;

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
