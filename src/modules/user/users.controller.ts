import {
    Controller,
    Get,
    Body,
    Param,
    Put,
    Delete,
    ForbiddenException,
} from '@nestjs/common';

import { UserType } from './user.type';
import { UsersService } from './users.service';

import { Profile } from '$decorator/profile';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':username')
    async findOne(@Param('username') username: string): Promise<UserType> {
        return this.usersService.get_user_profile(username);
    }

    @Put(':username')
    async update(
        @Param('username') username: string,
        @Body() user: UserType,
        @Profile() profile: string,
    ): Promise<UserType> {
        if (profile !== username) throw new ForbiddenException();
        return this.usersService.update(username, user);
    }

    @Delete(':username')
    async remove(@Param('username') username: string): Promise<void> {
        return this.usersService.remove(username);
    }
}
