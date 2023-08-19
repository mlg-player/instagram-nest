import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

import type { RelationshipType } from './relationship.type';

@Entity()
export class RelationshipEntity implements RelationshipType {
    @PrimaryGeneratedColumn('uuid')
    id: RelationshipType['id'];

    @Column({
        nullable: false,
        type: 'text',
    })
    incoming_status: RelationshipType['incoming_status'];

    @Column({
        nullable: false,
        type: 'text',
    })
    outgoing_status: RelationshipType['outgoing_status'];

    @OneToOne(() => UserEntity, (user) => user.username)
    @JoinColumn({ name: 'username' })
    user: RelationshipType['user'];

    @OneToOne(() => UserEntity, (user) => user.username)
    @JoinColumn({ name: 'username' })
    target: RelationshipType['target'];
}
