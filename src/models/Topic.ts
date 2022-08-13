import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Chat} from './Chat';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  topic_id: number;

  @Column()
  topic_name: string;

  @Column()
  hot_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => Chat, chat => chat.topic)
  chats: Chat[];
}
