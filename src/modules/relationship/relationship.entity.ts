import { Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity()
export class RelationshipEntity {
    @PrimaryGeneratedColumn('uuid')
    connection_id: string;

    @ManyToOne(() => UserEntity, (user) => user.following)
    @JoinColumn()
    following: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user)
    @JoinColumn()
    user: UserEntity;
}
