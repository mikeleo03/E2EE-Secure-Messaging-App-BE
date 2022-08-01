import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum RequestTopicStatus {
  PENDING = 0,
  APPROVED = 1,
  DECLINED = -1,
}

@Entity()
export class RequestTopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: RequestTopicStatus,
    default: RequestTopicStatus.PENDING,
  })
  status: RequestTopicStatus;

  @CreateDateColumn()
  created_at: Date;
}
