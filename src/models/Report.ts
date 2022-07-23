import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Chat} from './Chat';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat)
  chat_id: Chat;

  @Column()
  reporter_id: number;

  @Column()
  reported_id: number;

  @Column()
  reason: string;
}
