import { foriengnKeyName } from 'src/constants';
import { Employee } from 'src/employee/entities/employee.entity';
import { MeetingAgenda } from 'src/meetingAgenda/entities/meetingAgenda.entity';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'meetings',
})
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Visitor, (visitor: Visitor) => visitor.id, { nullable: true })
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('visitorId', 'meetings'),
    referencedColumnName: 'id',
    name: 'visitorId',
  })
  visitor: Visitor;

  @Column({ nullable: true })
  visitorId: number;

  @OneToOne(
    () => MeetingAgenda,
    (meetingAgenda: MeetingAgenda) => meetingAgenda.id,
  )
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('meetingAgendaId', 'meetings'),
    referencedColumnName: 'id',
    name: 'meetingAgendaId',
  })
  meetingAgenda: MeetingAgenda;

  @Column()
  meetingAgendaId: number;

  @OneToOne(() => Employee, (employee: Employee) => employee.id)
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('hostId', 'meetings'),
    referencedColumnName: 'id',
    name: 'hostId',
  })
  host: Employee;

  @Column()
  hostId: number;

  @OneToOne(() => Employee, (employee: Employee) => employee.id, {
    nullable: true,
  })
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('employeeId', 'meetings'),
    referencedColumnName: 'id',
    name: 'employeeId',
  })
  employee: Employee;

  @Column({ nullable: true })
  employeeId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  scheduledTime: Date;

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
