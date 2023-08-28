import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';

import type { PostDto, PostType } from './post.type';

import { FilesService } from '$module/files/files.service';
import { RelationshipService } from '$module/relationship/relationship.service';
import { UsersService } from '$module/user/users.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        private readonly filesService: FilesService,
        private readonly rsService: RelationshipService,
        private readonly usersService: UsersService,
    ) {}

    private default_select = {
        caption: true,
        is_video: true,
        location: true,
        media: true,
        permalink: true,
        timestamp: true,
        user: {
            profile_picture: true,
            username: true,
            is_private: true,
            is_verified: true,
        },
    };

    async findAll(): Promise<PostType[]> {
        return this.postsRepository.find();
    }
    /** @param range - `0-20` takes posts from 0-20 by default */
    async findUsersAll(
        username: string,
        range = '0-20',
        with_user = true,
    ): Promise<PostType[]> {
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
            where: {
                user: {
                    username,
                },
            },
            take: limit,
            skip: offset,
            relations: {
                user: with_user,
            },
            select: this.default_select,
        });
    }

    async get_users_posts(
        author: string,
        username: string,
        range?: string,
        with_user = false,
    ): Promise<PostType[]> {
        if (author === username) {
            return this.findUsersAll(author, range, with_user);
        }

        await this.usersService.get_access_to_user(author, username);

        return this.findUsersAll(author, range, with_user);
    }

    /** Get posts lists from followed users and yourself */
    async get_feed_posts(
        username: string,
        with_user = true,
    ): Promise<PostType[]> {
        const get_all_users = await this.rsService.get_followed_users(username);

        if (!get_all_users || !get_all_users.length) return [];
        const list = get_all_users.map((connection) => ({
            username: connection.following.username,
        }));

        return this.postsRepository.find({
            where: {
                user: [
                    ...list,
                    {
                        username: username,
                    },
                ],
            },
            relations: {
                user: with_user,
                media: true,
            },
            select: this.default_select,
        });
    }
    async findOne(permalink: string): Promise<PostType> {
        return this.postsRepository.findOne({
            where: { permalink },
            relations: {
                user: true,
            },
            select: this.default_select,
        });
    }

    async create(post: PostDto, username: string): Promise<PostType> {
        const media = await Promise.all(
            post.media.map((media) => this.filesService.get_media(media)),
        );
        const user = await this.usersService.findOne(username);
        if (!media || !user) throw new BadRequestException();

        return this.postsRepository.save({
            caption: post.caption,
            media: media,
            timestamp: Number(new Date()),
            is_video: false,
            location: post.location,
            user: user,
        });
    }

    async update(permalink: string, post: PostType): Promise<PostType> {
        await this.postsRepository.update(permalink, post);
        return this.findOne(permalink);
    }

    async remove(permalink: string, profile: string): Promise<void> {
        await this.postsRepository.delete({
            permalink,
            user: {
                username: profile,
            },
        });
    }
}
