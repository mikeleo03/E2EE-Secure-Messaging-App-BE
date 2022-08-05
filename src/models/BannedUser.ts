import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class BannedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;
}
