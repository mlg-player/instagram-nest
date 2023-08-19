import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';

import type { CommentType } from './comment.type';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private usersRepository: Repository<CommentEntity>,
    ) {}

    async findAll(): Promise<CommentType[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<CommentType> {
        return this.usersRepository.findOne({
            where: { id },
        });
    }

    async create(Post: CommentType): Promise<CommentType> {
        return this.usersRepository.save(Post);
    }

    async update(username: string, Post: CommentType): Promise<CommentType> {
        await this.usersRepository.update(username, Post);
        return this.findOne(username);
    }

    async remove(username: string): Promise<void> {
        await this.usersRepository.delete(username);
    }
}
