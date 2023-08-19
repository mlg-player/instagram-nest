import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RelationshipEntity } from './relationship.entity';
import { RELATIONSHIP_STATUSES } from './relationship.type';

@Injectable()
export class RelationshipService {
    constructor(
        @InjectRepository(RelationshipEntity)
        private relationshipRepository: Repository<RelationshipEntity>,
    ) {}

    async follow(user: string, requested_by: string) {
        if (!requested_by) throw new UnauthorizedException();

        this.relationshipRepository.create({
            incoming_status: RELATIONSHIP_STATUSES.NONE,
            outgoing_status: RELATIONSHIP_STATUSES.REQUESTED,
            requested_user: user,
            user: requested_by,
        });
    }

    /** @deprecated Do not use this method, This will throw error */
    async get_relationship(target: string, requested_by: string) {
        if (!requested_by) throw new UnauthorizedException();
        const relationship = {
            connection_id: 'none',
            incoming_status: RELATIONSHIP_STATUSES.NONE,
            outgoing_status: RELATIONSHIP_STATUSES.NONE,
            requested_user: requested_by,
            user: target,
        };
        const where = [
            {
                user: target,
                requested_user: requested_by,
            },
            {
                user: requested_by,
                requested_user: target,
            },
        ];
        const founded = await this.relationshipRepository
            .findOne({
                where,
                loadEagerRelations: true,
            })

            .catch((reason) => {
                console.log(reason);
            });
        if (!founded) return relationship;
        if (founded.requested_user === target) {
            relationship.incoming_status = founded.incoming_status;
            relationship.outgoing_status = founded.outgoing_status;
            relationship.requested_user = founded.requested_user;
            relationship.user = founded.user;
        } else {
            relationship.outgoing_status = founded.incoming_status;
            relationship.incoming_status = founded.outgoing_status;
            relationship.user = founded.requested_user;
            relationship.requested_user = founded.user;
        }
        return relationship;
    }
}
