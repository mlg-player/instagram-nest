import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';

import type { PostType } from './post.type';

import { RelationshipService } from '$module/relationship/relationship.service';
import { UsersService } from '$module/user/users.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        private readonly rsService: RelationshipService,
        private readonly usersService: UsersService,
    ) {}

    async findAll(): Promise<PostType[]> {
        return this.postsRepository.find();
    }
    async findUsersAll(username: string): Promise<PostType[]> {
        return this.postsRepository.find({
            where: { username },
        });
    }

    async get_users_posts(
        author: string,
        username: string,
    ): Promise<PostType[]> {
        if (author === username) return this.findUsersAll(author);

        await this.usersService.get_access_to_user(author, username);

        return this.findUsersAll(author);
    }

    async findOne(permalink: string): Promise<PostType> {
        return this.postsRepository.findOne({
            where: { permalink },
        });
    }

    async create(post: PostType): Promise<PostType> {
        return this.postsRepository.save(post);
    }

    async update(permalink: string, post: PostType): Promise<PostType> {
        await this.postsRepository.update(permalink, post);
        return this.findOne(permalink);
    }

    async remove(permalink: string): Promise<void> {
        await this.postsRepository.delete(permalink);
    }
}
