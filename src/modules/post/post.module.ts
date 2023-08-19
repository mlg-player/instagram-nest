import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

import { RelationshipModule } from '$module/relationship/relationship.module';
import { UsersModule } from '$module/user/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        UsersModule,
        RelationshipModule,
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {}
