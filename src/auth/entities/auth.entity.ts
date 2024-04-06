import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'auths',
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
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}
