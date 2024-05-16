import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class SharedKey {
    @PrimaryColumn()
    user_id: string;

    @Column()
    sharedX: string;

    @Column()
    sharedY: string;

    @Column()
    stored_datetime: Date;
}
