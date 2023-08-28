import {
    BadRequestException,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';

import { Profile } from '$decorator/profile';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadFile(
        @UploadedFiles() files: Express.Multer.File[],
        @Profile() profile: string,
    ) {
        if (!files || !files.length) throw new BadRequestException();
        const list = Promise.all(
            files.map((file) =>
                this.filesService.handleFileUpload(file, profile),
            ),
        );
        return await list;
    }
}
