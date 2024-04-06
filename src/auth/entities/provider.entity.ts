import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auth } from './auth.entity';

@Entity({
  name: 'providers',
})
export class Provider {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @OneToMany(() => Auth, (auth: Auth) => auth.id)
  authId: string;

  @Column({
    nullable: false,
  })
  name: string;
}
