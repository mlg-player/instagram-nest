import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import { MEDIA_TYPES } from '$module/post/post.type';
import { UserEntity } from '$module/user/user.entity';

@Entity()
export class FilesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    media_url: string;

    @ManyToOne(() => UserEntity, ({ username }) => username)
    @JoinColumn({
        name: 'author',
    })
    author: UserEntity['username'];

    @Column('text')
    media_type: MEDIA_TYPES;
}
