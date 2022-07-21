import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topicName: string;

  @Column()
  hotStatus: boolean;

  @Column({type: 'timestamptz'})
  createdAt: Date;
}
