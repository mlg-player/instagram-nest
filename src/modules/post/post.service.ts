import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';

import type { PostDto, PostType } from './post.type';

import { FilesService } from '$module/files/files.service';
import { UsersService } from '$module/user/users.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        private readonly filesService: FilesService,
        private readonly usersService: UsersService,
    ) {}

    async findAll(): Promise<PostType[]> {
        return this.postsRepository.find();
    }
    /** @param range - `0-20` takes posts from 0-20 by default */
    async findUsersAll(username: string, range = '0-20'): Promise<PostType[]> {
        const [offset, limit] = range.split('-').map((v) => Number(v));

        if (
            Number.isNaN(limit) ||
            Number.isNaN(offset) ||
            0 > limit ||
            0 > offset
        ) {
            throw new BadRequestException();
        }
        return this.postsRepository.find({
            where: { username },
            take: limit,
            skip: offset,
        });
    }

    async get_users_posts(
        author: string,
        username: string,
        range?: string,
    ): Promise<PostType[]> {
        if (author === username) return this.findUsersAll(author);

        await this.usersService.get_access_to_user(author, username);

        return this.findUsersAll(author, range);
    }

    async findOne(permalink: string): Promise<PostType> {
        return this.postsRepository.findOne({
            where: { permalink },
        });
    }

    async create(post: PostDto, username: string): Promise<PostType> {
        const media = await this.filesService.get_media(post.media);

        if (!media) throw new BadRequestException();
        const to_save = {
            caption: post.caption,
            media_type: media.media_type,
            media_url: media.media_url,
            thumbnail_url: media.media_url,
            timestamp: Number(new Date()),
            is_video: false,
            location: post.location,
            username: username,
        };
        return this.postsRepository.save(to_save);
    }

    async update(permalink: string, post: PostType): Promise<PostType> {
        await this.postsRepository.update(permalink, post);
        return this.findOne(permalink);
    }

    async remove(permalink: string): Promise<void> {
        await this.postsRepository.delete(permalink);
    }
}
