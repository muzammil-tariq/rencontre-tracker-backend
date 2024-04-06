import { Auth } from 'src/auth/entities/auth.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'meeting_agends',
})
export class MeetingAgenda {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({
    unique: true,
  })
  @OneToOne(() => Auth, (auth: Auth) => auth.email)
  email: string;

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
