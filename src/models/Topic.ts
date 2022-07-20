import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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
}
