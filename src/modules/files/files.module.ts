import { extname } from 'path';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { v4 as uuid_v4 } from 'uuid';

import { FilesController } from './files.controller';
import { FilesEntity } from './files.entity';
import { FilesService } from './files.service';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';

const file_upload_limit = 10 * 1024 * 1024; // 10mb

@Module({
    imports: [
        TypeOrmModule.forFeature([FilesEntity]),
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads/media',
                filename: (req, file, callback) => {
                    const uniqueSuffix = uuid_v4();
                    const extension = extname(file.originalname);
                    const filename = uniqueSuffix + extension;

                    callback(null, filename);
                },
            }),
            fileFilter(req, file, callback) {
                const is_image = file.mimetype.startsWith('image/');
                callback(null, is_image);
            },
            limits: {
                files: 10,
                fileSize: file_upload_limit,
            },
        }),
    ],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(FilesController);
    }
}
