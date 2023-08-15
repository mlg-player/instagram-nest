import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';

import type { PostType } from './post.type';

@Injectable()
export class PostService {
      constructor(
            @InjectRepository(PostEntity)
            private usersRepository: Repository<PostEntity>,
      ) {}

      async findAll(): Promise<PostType[]> {
            return this.usersRepository.find();
      }

      async get_users_posts(username: string): Promise<PostType[]> {
            return this.usersRepository.find({
                  where: { username },
            });
      }

      async findOne(permalink: string): Promise<PostType> {
            return this.usersRepository.findOne({
                  where: { permalink },
            });
      }

      async create(post: PostType): Promise<PostType> {
            return this.usersRepository.save(post);
      }

      async update(permalink: string, post: PostType): Promise<PostType> {
            await this.usersRepository.update(permalink, post);
            return this.findOne(permalink);
      }

      async remove(permalink: string): Promise<void> {
            await this.usersRepository.delete(permalink);
      }
}
