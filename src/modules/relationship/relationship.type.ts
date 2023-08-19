import type { UserType } from '$module/user/user.type';

export type RelationshipType = {
    connection_id: string;

    user: UserType['username'];

    requested_user: UserType['username'];

    incoming_status: RELATIONSHIP_STATUSES;

    outgoing_status: RELATIONSHIP_STATUSES;
};

export enum RELATIONSHIP_STATUSES {
    NONE = 'none',
    FOLLOWS = 'follows',
    REQUESTED = 'requested',
}
