import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { PostEntity } from './post/post.entity';
import { LikeEntity } from './like/like.entity';
import { CommentEntity } from './comment/comment.entity';
import { LocationEntity } from './location/location.entity';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './user/users.module';
import { CommentModule } from './comment/comment.module';
import { LocationModule } from './location/location.module';

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
                  ],
                  synchronize: true,
            }),
            LikeModule,
            PostModule,
            UsersModule,
            CommentModule,
            LocationModule,
      ],
      controllers: [],
      providers: [],
})
export class AppModule {}
