import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

import { RelationshipControllers } from './relationship.controller';
import { RelationshipEntity } from './relationship.entity';
import { RelationshipService } from './relationship.service';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';

import { UsersModule } from '$module/user/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([RelationshipEntity]), UsersModule],
    controllers: [RelationshipControllers],
    providers: [RelationshipService],
    exports: [RelationshipService],
})
export class RelationshipModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(RelationshipControllers);
    }
}
