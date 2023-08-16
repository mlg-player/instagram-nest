import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import env_config from 'src/env.config';

import type { NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const unauthorized_error = new HttpException(
            'Not authorized',
            HttpStatus.UNAUTHORIZED,
        );
        const get_authorization = req.headers?.authorization;

        if (!get_authorization) throw unauthorized_error;

        const authorization = get_authorization.replace('Bearer ', '');
        try {
            const decoded = verify(authorization, env_config.SALT_KEY);

            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);

            if (typeof decoded === 'string') throw unauthorized_error;
            // !TODO add check if user exists in DB
            return next();
        } catch (e) {
            throw unauthorized_error;
        }
    }
}
