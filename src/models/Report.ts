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

  @Column()
  chat_id: string;

  @Column()
  issuer_id: string;

  @Column()
  issued_id: string;

  @Column()
  reason: string;

  @Column()
  seen: boolean;
}
