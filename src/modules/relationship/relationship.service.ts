import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RelationshipEntity } from './relationship.entity';
import { RELATIONSHIP_STATUSES } from './relationship.type';

@Injectable()
export class RelationshipService {
    constructor(
        @InjectRepository(RelationshipEntity)
        private usersRepository: Repository<RelationshipEntity>,
    ) {}

    async get_relationship(
        target: string,
        user: string,
    ): Promise<RelationshipEntity> {
        const where = [
            {
                user: target,
                target: user,
            },
            {
                user: user,
                target: target,
            },
        ];
        const founded = await this.usersRepository.findOne({
            where,
        });
        const relationship: RelationshipEntity = {
            id: 'none',
            incoming_status: RELATIONSHIP_STATUSES.NONE,
            outgoing_status: RELATIONSHIP_STATUSES.NONE,
            target: user,
            user: target,
        };
        if (!founded) return relationship;
        if (founded.target === target) {
            relationship.incoming_status = founded.incoming_status;
            relationship.outgoing_status = founded.outgoing_status;
            relationship.target = founded.target;
            relationship.user = founded.user;
        } else {
            relationship.outgoing_status = founded.incoming_status;
            relationship.incoming_status = founded.outgoing_status;
            relationship.user = founded.target;
            relationship.target = founded.user;
        }
        return relationship;
    }
}
