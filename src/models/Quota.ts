import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  user_quota: number;

  @CreateDateColumn()
  quota_at: Date;
}
