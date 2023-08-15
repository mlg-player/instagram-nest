import {
      Entity,
      PrimaryGeneratedColumn,
      OneToOne,
      Column,
      JoinColumn,
} from 'typeorm';

import { LocationEntity } from '../location/location.entity';
import { UserEntity } from '../user/user.entity';

import type { PostType } from './post.type';

@Entity()
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
      @Column({
            nullable: false,
            type: 'text',
      })
      media_type: PostType['media_type'];

      /** URL медиа-контента (фотографии или видео) в посте. */
      @Column({
            nullable: false,
            type: 'text',
      })
      media_url: PostType['media_url'];

      /** URL миниатюры медиа-контента (для видео или карусели). */
      @Column('text')
      thumbnail_url: PostType['thumbnail_url'];

      /** Временная метка, указывающая на время публикации поста. */
      @Column({
            nullable: false,
            type: 'integer',
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
      @OneToOne(() => LocationEntity, (location) => location)
      @JoinColumn({
            name: 'location',
      })
      location: PostType['location'];

      /** (объект): Информация о пользователе, который опубликовал пост, включая имя пользователя, идентификатор и другие данные. */
      @OneToOne(() => UserEntity, (user) => user.username)
      @JoinColumn({ name: 'username' })
      username: PostType['username'];

      @OneToOne(() => UserEntity, (user) => user.full_name)
      @JoinColumn({ name: 'full_name' })
      full_name: PostType['full_name'];

      @OneToOne(() => UserEntity, (user) => user.profile_picture)
      @JoinColumn({ name: 'profile_picture' })
      profile_picture: PostType['profile_picture'];
}
