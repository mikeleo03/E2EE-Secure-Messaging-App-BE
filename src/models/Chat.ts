import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryColumn()
  chat_id: string;

  @Column()
  topic_id: number;

  @Column()
  user_id1: string;

  @Column()
  user_id2: string;

  @Column()
  start_datetime: Date;

  @Column({nullable: true})
  end_datetime: Date;
}
