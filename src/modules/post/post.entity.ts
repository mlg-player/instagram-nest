import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import { LocationEntity } from '../location/location.entity';
import { UserEntity } from '../user/user.entity';

import type { PostType } from './post.type';

import { FilesEntity } from '$module/files/files.entity';

@Entity({
    orderBy: {
        timestamp: 'DESC',
    },
})
export class PostEntity implements PostType {
    /** Постоянная ссылка на пост. */
    @PrimaryGeneratedColumn('uuid')
    permalink: PostType['permalink'];

    /** Текстовое описание к посту. */
    @Column({
        nullable: true,
        type: 'text',
    })
    caption: PostType['caption'];

    /** Тип медиа-контента в посте (фотография, видео, карусель и т.д.). */
    @ManyToMany(() => FilesEntity, (file) => file)
    @JoinTable()
    media: FilesEntity[];

    /** Временная метка, указывающая на время публикации поста. */
    @Column({
        nullable: false,
        type: 'bigint',
    })
    timestamp: PostType['timestamp'];

    /** Флаг, указывающий, является ли медиа-контент видео. */
    @Column({
        nullable: false,
        default: false,
        type: 'boolean',
    })
    is_video: PostType['is_video'];

    /** (объект): Информация о местоположении, где был опубликован пост, включая координаты и другие данные. */
    @ManyToOne(() => LocationEntity, (location) => location)
    @JoinColumn({
        name: 'location',
    })
    location: PostType['location'];

    /** (объект): Информация о пользователе, который опубликовал пост, включая имя пользователя, идентификатор и другие данные. */

    @ManyToOne(() => UserEntity, (user) => user)
    @JoinColumn()
    user: UserEntity;
}
