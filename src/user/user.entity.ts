import { Entity, PrimaryColumn, Column } from 'typeorm';
import { UserType } from './user.type';

@Entity()
export class UserEntity implements UserType {
  @PrimaryColumn()
  username: string;

  @Column()
  full_name: string | null;

  @Column()
  bio: string | null;

  @Column()
  website: string | null;

  @Column()
  profile_picture: string | null;

  @Column({
    default: false,
  })
  is_private: boolean;

  @Column({
    default: false,
  })
  is_verified: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;
}
