import { Entity, PrimaryColumn, Column } from 'typeorm';

import type { UserType } from './user.type';

@Entity()
export class UserEntity implements UserType {
      @PrimaryColumn({
            unique: true,
            type: 'varchar',
      })
      username: UserType['username'];

      @Column({
            type: 'text',
      })
      full_name: UserType['full_name'];

      @Column({
            type: 'text',
      })
      bio: UserType['bio'];

      @Column({
            type: 'text',
      })
      website: UserType['website'];

      @Column({
            type: 'text',
      })
      profile_picture: UserType['profile_picture'];

      @Column({
            default: false,
            type: 'bool',
      })
      is_private: UserType['is_private'];

      @Column({
            default: false,
            type: 'bool',
      })
      is_verified: UserType['is_verified'];

      @Column({
            unique: true,
            type: 'text',
      })
      email: UserType['email'];

      @Column('text')
      password: UserType['password'];

      @Column('text')
      phone: UserType['phone'];
}
