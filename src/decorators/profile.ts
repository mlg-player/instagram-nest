import { createParamDecorator } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const Profile = createParamDecorator(
    (_: undefined, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest() as Request;
        const get_authorization = request.headers['authorization'];
        const secret = process.env.SALT_KEY;

        if (!secret || !get_authorization) return undefined;
        const authorization = get_authorization.replace('Bearer ', '').trim();

        let decoded:
            | {
                  username: string;
              }
            | undefined;

        try {
            decoded = verify(authorization, secret) as {
                username: string;
            };
        } catch (e) {
            return undefined;
        }
        return decoded.username;
    },
);
