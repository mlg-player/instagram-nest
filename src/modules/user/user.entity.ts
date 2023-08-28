import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

import { RelationshipEntity } from '$module/relationship/relationship.entity';

@Entity()
export class UserEntity {
    @PrimaryColumn({
        unique: true,
        type: 'varchar',
    })
    username: string;

    @Column({
        type: 'text',
    })
    full_name: string;

    @Column({
        type: 'text',
    })
    bio: string;

    @Column({
        type: 'text',
    })
    website: string;

    @Column({
        type: 'text',
    })
    profile_picture: string;

    @Column({
        default: false,
        type: 'bool',
    })
    is_private: boolean;

    @Column({
        default: false,
        type: 'bool',
    })
    is_verified: boolean;

    @Column({
        unique: true,
        type: 'text',
    })
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    phone: string;

    @OneToMany(() => RelationshipEntity, (relationship) => relationship.user)
    following: RelationshipEntity[];

    @OneToMany(() => RelationshipEntity, (relationship) => relationship.user)
    followed: RelationshipEntity[];
}
