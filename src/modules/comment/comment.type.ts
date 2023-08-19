import type { PostType } from '$module/post/post.type';
import type { UserType } from '$module/user/user.type';

export type CommentType = {
    id: string;

    post_id: PostType['permalink'];

    content: string;

    profile_picture: UserType['profile_picture'];

    username: UserType['username'];
};
