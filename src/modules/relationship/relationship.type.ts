import type { UserType } from '$module/user/user.type';

export type RelationshipType = {
    connection_id: string;

    followers: UserType['username'];

    following: UserType['username'];
};
