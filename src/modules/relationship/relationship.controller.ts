import { Controller, Param, Post } from '@nestjs/common';

import { RelationshipService } from './relationship.service';

import { Profile } from '$decorator/profile';

@Controller('relationship')
export class RelationshipControllers {
    constructor(private readonly rsService: RelationshipService) {}
    @Post('follow/:user')
    async create(@Param('user') user: string, @Profile() requested_by: string) {
        return this.rsService.follow(user, requested_by);
    }
}
