import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column()
  topic_id: number;

  @Column()
  user_id1: string;

  @Column()
  user_id2: string;

  @Column()
  start_datetime: Date;

  @Column()
  end_datetime: Date;
}
