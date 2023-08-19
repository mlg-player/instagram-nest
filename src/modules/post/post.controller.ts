import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { PostService } from './post.service';
import { PostType } from './post.type';

import { Profile } from '$decorator/profile';
import { UsersService } from '$module/user/users.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UsersService,
    ) {}

    @Get('user/:user')
    async get_users_post(
        @Profile() profile: string,
        @Param('user') username: string,
    ): Promise<PostType[]> {
        const found_user = await this.userService.findOne(username);
        if (found_user.is_private) return [];
        return this.postService.get_users_posts(username, profile);
    }

    @Get(':permalink')
    async findOne(@Param('permalink') permalink: string): Promise<PostType> {
        return this.postService.findOne(permalink);
    }

    @Post()
    async create(@Body() user: PostType): Promise<PostType> {
        return this.postService.create(user);
    }

    @Delete(':permalink')
    async remove(@Param('permalink') permalink: string): Promise<void> {
        return this.postService.remove(permalink);
    }
}
