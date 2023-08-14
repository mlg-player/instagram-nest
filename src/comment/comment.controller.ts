import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentType } from './comment.type';

@Controller(':post/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(@Param('post') post: string): Promise<CommentType[]> {
    return this.commentService.findAll();
  }

  @Get(':username')
  async findOne(
    @Param('post') post: string,
    @Param('username') username: string,
  ): Promise<CommentType> {
    return this.commentService.findOne(username);
  }

  @Post()
  async create(
    @Param('post') post: string,
    @Body() user: CommentType,
  ): Promise<CommentType> {
    return this.commentService.create(user);
  }

  @Put(':username')
  async update(
    @Param('post') post: string,
    @Param('username') username: string,
    @Body() user: CommentType,
  ): Promise<CommentType> {
    return this.commentService.update(username, user);
  }

  @Delete(':username')
  async remove(
    @Param('post') post: string,
    @Param('username') username: string,
  ): Promise<void> {
    return this.commentService.remove(username);
  }
}
