import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number;

  @Column()
  chat_id: string;

  @Column()
  sender_id: string;

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
