import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RelationshipEntity } from './relationship.entity';

import { UsersService } from '$module/user/users.service';

@Injectable()
export class RelationshipService {
    constructor(
        @InjectRepository(RelationshipEntity)
        private relationshipRepository: Repository<RelationshipEntity>,
        private userService: UsersService,
    ) {}

    async follow(target: string, requested_by: string) {
        const target_user = await this.userService.findOne(target);
        const requested_user = await this.userService.findOne(requested_by);
        if (!target_user || !requested_user) throw new UnauthorizedException();

        return this.relationshipRepository.save({
            following: target_user,
            username: requested_user,
        });
    }

    async get_followed_users(profile: string) {
        return this.relationshipRepository.find({
            where: {
                user: {
                    username: profile,
                },
            },
            relations: {
                following: true,
            },
        });
    }

    /** @deprecated Do not use this method, This will throw error */
    async get_relationship(target: string, requested_by: string) {
        if (!requested_by) throw new UnauthorizedException();
        const relationship = {
            user: requested_by,
            target: target,
        };

        // const founded = await this.relationshipRepository
        //     .findOne({
        //         where: [
        //             {
        //                 following: target,
        //                 followers: requested_by,
        //             },
        //             {
        //                 following: requested_by,
        //                 followers: target,
        //             },
        //         ],
        //         loadEagerRelations: true,
        //     })

        //     .catch((reason) => {
        //         console.log(reason);
        //     });
        // if (!founded) return relationship;
        // if (founded.following !== target) {
        //     relationship.user = founded.following;
        //     relationship.target = founded.followers;
        // }
        return relationship;
    }
}
