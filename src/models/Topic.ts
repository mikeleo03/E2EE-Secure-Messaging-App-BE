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
  topic_name: string;

  @Column()
  hot_status: boolean;

  @CreateDateColumn({type: 'timestamptz'})
  created_at: Date;
}
