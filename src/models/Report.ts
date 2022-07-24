import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import {Chat} from './Chat';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Chat)
  @JoinColumn({name: 'chat_id'})
  chat: Chat;

  @Column({type: 'int', nullable: true})
  chat_id: number;

  @Column()
  reporter_id: number;

  @Column()
  reported_id: number;

  @Column()
  reason: string;
}
