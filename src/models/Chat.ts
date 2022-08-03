import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column()
  topic_id: number;

  @Column()
  user_id1: number;

  @Column()
  user_id2: number;

  @Column()
  start_datetime: Date;

  @Column()
  end_datetime: Date;
}