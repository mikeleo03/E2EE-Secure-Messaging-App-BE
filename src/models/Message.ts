import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column()
  sender_id: string;

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
