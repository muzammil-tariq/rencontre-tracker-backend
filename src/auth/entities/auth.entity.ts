import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'Auths',
})
export class Auth {
  @Index({ unique: true })
  @PrimaryColumn({
    unique: true,
    nullable: false,
  })
  id: string;

  @Index({ unique: true })
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

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
