import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Topic} from './Topic';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic_id: number;

  @ManyToOne(() => Topic)
  @JoinColumn({name: 'topic_id'})
  topic: Topic;

  @Column()
  user_id1: number;

  @Column()
  user_id2: number;
}
