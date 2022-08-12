import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Session {
  @PrimaryColumn()
  user_id: string;

  @Column()
  isLoggedIn: boolean;
}
