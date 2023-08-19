import {
    Entity,
    OneToOne,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

import type { RelationshipType } from './relationship.type';

@Entity({
    name: 'relationship',
})
export class RelationshipEntity implements RelationshipType {
    @PrimaryGeneratedColumn('uuid')
    connection_id: RelationshipType['connection_id'];

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
    @JoinColumn({ name: 'user' })
    user: string;

    @OneToOne(() => UserEntity, (user) => user.username)
    @JoinColumn({ name: 'requested_user' })
    requested_user: string;
}
