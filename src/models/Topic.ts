import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topicName: string;

  @Column()
  hotStatus: boolean;

  @CreateDateColumn({type: 'timestamptz'})
  createdAt: Date;
}
