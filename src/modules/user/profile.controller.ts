import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

import type { UserType } from './user.type';

import { Profile } from '$decorator/profile';

@Controller('profile')
export class ProfileController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findOne(@Profile() username: string): Promise<UserType> {
        return this.usersService.get_user_profile(username);
    }
}
