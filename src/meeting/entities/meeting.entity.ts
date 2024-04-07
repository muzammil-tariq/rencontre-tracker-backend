import { foriengnKeyName } from 'src/constants';
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

  @OneToOne(() => Visitor, (visitor: Visitor) => visitor.id)
  @JoinColumn({
    foreignKeyConstraintName: foriengnKeyName('visitorId', 'meetings'),
    referencedColumnName: 'id',
    name: 'visitorId',
  })
  visitor: Visitor;

  @Column()
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
