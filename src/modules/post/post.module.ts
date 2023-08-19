import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';

import { FilesModule } from '$module/files/files.module';
import { RelationshipModule } from '$module/relationship/relationship.module';
import { UsersModule } from '$module/user/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        UsersModule,
        RelationshipModule,
        FilesModule,
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(PostController);
    }
}
