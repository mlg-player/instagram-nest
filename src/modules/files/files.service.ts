import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';

import { FilesEntity } from './files.entity';

import { MEDIA_TYPES } from '$module/post/post.type';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesEntity)
        private filesRepository: Repository<FilesEntity>,
    ) {}
    async create_thumbnail(file: Express.Multer.File) {
        sharp(file.path)
            .resize(200, 200)
            .toFile(`uploads/thumbnails/${file.filename}`);
    }
    async handleFileUpload(file: Express.Multer.File, author: string) {
        await this.create_thumbnail(file);
        return await this.filesRepository.save({
            author,
            media_url: file.filename,
            media_type: MEDIA_TYPES.IMAGE,
        });
    }

    async get_media(id: string) {
        return this.filesRepository.findOne({
            where: {
                id,
            },
        });
    }
}
