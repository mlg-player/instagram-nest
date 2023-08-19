import { Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';

@Module({
    controllers: [LikeController],
    providers: [LikeService],
    exports: [LikeService],
})
export class LikeModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(LikeController);
    }
}
