import { UserType } from 'src/user/user.type';

export type CommentType = {
  id: string;

  post_id: string;

  content: string;

  profile_picture: UserType['profile_picture'];

  username: UserType['username'];
};
