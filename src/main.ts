import { join } from 'path';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: false,
    });

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads',
    });
    await app.listen(3000);
}
bootstrap();
