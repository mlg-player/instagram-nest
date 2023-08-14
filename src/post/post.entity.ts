import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { LocationEntity } from '../location/location.entity';
import { MEDIA_TYPES, PostType } from './post.type';
import { UserType } from 'src/user/user.type';
import { LocationType } from '../location/location.type';

@Entity()
export class PostEntity implements PostType {
  /** Постоянная ссылка на пост. */
  @PrimaryGeneratedColumn('uuid')
  permalink: string;

  /** Текстовое описание к посту. */
  @Column({
    nullable: true,
  })
  caption: string;

  /** Тип медиа-контента в посте (фотография, видео, карусель и т.д.). */
  @Column({
    nullable: false,
  })
  media_type: MEDIA_TYPES;

  /** URL медиа-контента (фотографии или видео) в посте. */
  @Column({
    nullable: false,
  })
  media_url: string;

  /** URL миниатюры медиа-контента (для видео или карусели). */
  @Column()
  thumbnail_url: string;

  /** Временная метка, указывающая на время публикации поста. */
  @Column({
    nullable: false,
  })
  timestamp: number;

  /** Флаг, указывающий, является ли медиа-контент видео. */
  @Column({
    nullable: false,
    default: false,
  })
  is_video: boolean;

  /** (объект): Информация о местоположении, где был опубликован пост, включая координаты и другие данные. */
  @OneToOne(() => LocationEntity, (location) => location)
  @JoinColumn({
    name: 'location',
  })
  location: LocationType['id'];

  /** (объект): Информация о пользователе, который опубликовал пост, включая имя пользователя, идентификатор и другие данные. */
  @OneToOne(() => UserEntity, (user) => user.username)
  @JoinColumn({ name: 'username' })
  username: UserType['username'];

  @OneToOne(() => UserEntity, (user) => user.full_name)
  @JoinColumn({ name: 'full_name' })
  full_name: UserType['full_name'];

  @OneToOne(() => UserEntity, (user) => user.profile_picture)
  @JoinColumn({ name: 'profile_picture' })
  profile_picture: UserType['profile_picture'];
}
