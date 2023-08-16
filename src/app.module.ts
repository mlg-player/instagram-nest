import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntity } from './modules/comment/comment.entity';
import { CommentModule } from './modules/comment/comment.module';
import { LikeEntity } from './modules/like/like.entity';
import { LikeModule } from './modules/like/like.module';
import { LocationEntity } from './modules/location/location.entity';
import { LocationModule } from './modules/location/location.module';
import { PostEntity } from './modules/post/post.entity';
import { PostModule } from './modules/post/post.module';
import { RelationshipModule } from './modules/relationship/relationship.module';
import { UserEntity } from './modules/user/user.entity';
import { UsersModule } from './modules/user/users.module';

import { RelationshipEntity } from '$module/relationship/relationship.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'network',
            entities: [
                CommentEntity,
                LikeEntity,
                LocationEntity,
                PostEntity,
                UserEntity,
                RelationshipEntity,
            ],
            synchronize: true,
        }),
        LikeModule,
        PostModule,
        UsersModule,
        CommentModule,
        LocationModule,
        RelationshipModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
