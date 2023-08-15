import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { PostService } from './post.service';
import { PostType } from './post.type';

@Controller('post')
export class PostController {
      constructor(private readonly postService: PostService) {}

      @Get('user/:user')
      async get_users_post(@Param('user') id: string): Promise<PostType[]> {
            return this.postService.get_users_posts(id);
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
