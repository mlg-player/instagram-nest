import { PostEntity } from 'src/post/post.entity';
import { PostType } from 'src/post/post.type';
import { UserEntity } from 'src/user/user.entity';
import { UserType } from 'src/user/user.type';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { CommentType } from './comment.type';

@Entity()
export class CommentEntity implements CommentType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PostEntity, ({ permalink }) => permalink)
  @JoinColumn({
    name: 'post_id',
  })
  post_id: PostType['permalink'];

  @Column()
  content: string;

  @OneToOne(() => UserEntity, ({ profile_picture }) => profile_picture)
  @JoinColumn({
    name: 'profile_picture',
  })
  profile_picture: UserType['profile_picture'];

  @OneToOne(() => UserEntity, ({ username }) => username)
  @JoinColumn({
    name: 'username',
  })
  username: UserType['username'];
}
