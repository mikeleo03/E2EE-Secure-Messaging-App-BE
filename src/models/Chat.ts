import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id1: number;

  @Column()
  user_id2: number;
}
