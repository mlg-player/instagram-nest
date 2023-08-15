import {
      Entity,
      PrimaryGeneratedColumn,
      OneToOne,
      Column,
      JoinColumn,
} from 'typeorm';

import type { CommentType } from './comment.type';

import { PostEntity } from '$module/post/post.entity';
import { UserEntity } from '$module/user/user.entity';

@Entity()
export class CommentEntity implements CommentType {
      @PrimaryGeneratedColumn('uuid')
      id: CommentType['id'];

      @OneToOne(() => PostEntity, ({ permalink }) => permalink)
      @JoinColumn({
            name: 'post_id',
      })
      post_id: CommentType['post_id'];

      @Column('text')
      content: CommentType['content'];

      @OneToOne(() => UserEntity, ({ profile_picture }) => profile_picture)
      @JoinColumn({
            name: 'profile_picture',
      })
      profile_picture: CommentType['profile_picture'];

      @OneToOne(() => UserEntity, ({ username }) => username)
      @JoinColumn({
            name: 'username',
      })
      username: CommentType['username'];
}
