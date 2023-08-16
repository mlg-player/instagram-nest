import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import type { LikeType } from './like.type';

import { PostEntity } from '$module/post/post.entity';
import { UserEntity } from '$module/user/user.entity';

@Entity()
export class LikeEntity implements LikeType {
    @PrimaryGeneratedColumn('uuid')
    id: LikeType['id'];

    @OneToOne(() => PostEntity, ({ permalink }) => permalink)
    @JoinColumn({
        name: 'post_id',
    })
    post_id: LikeType['post_id'];

    @OneToOne(() => UserEntity, ({ profile_picture }) => profile_picture)
    @JoinColumn({
        name: 'profile_picture',
    })
    profile_picture: LikeType['profile_picture'];

    @OneToOne(() => UserEntity, ({ username }) => username)
    @JoinColumn({
        name: 'username',
    })
    username: LikeType['username'];
}
