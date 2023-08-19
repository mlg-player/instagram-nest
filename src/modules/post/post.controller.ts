import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    BadRequestException,
} from '@nestjs/common';

import { PostService } from './post.service';
import { PostDto, PostDtoSchema } from './post.type';

import type { PostType } from './post.type';

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
        @Query('range') range?: string,
    ): Promise<PostType[]> {
        const found_user = await this.userService.findOne(username);
        if (found_user.is_private) return [];
        return this.postService.get_users_posts(username, profile, range);
    }

    @Get(':permalink')
    async findOne(@Param('permalink') permalink: string): Promise<PostType> {
        return this.postService.findOne(permalink);
    }

    @Post('create')
    async create(
        @Body() post_dto: PostDto,
        @Profile() username: string,
    ): Promise<PostType> {
        const validate = PostDtoSchema.validate(post_dto);

        if (validate.error) {
            throw new BadRequestException(validate.error.message);
        }

        return this.postService.create(post_dto, username);
    }

    @Delete(':permalink')
    async remove(@Param('permalink') permalink: string): Promise<void> {
        return this.postService.remove(permalink);
    }
}
