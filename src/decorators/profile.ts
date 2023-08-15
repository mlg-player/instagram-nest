import { createParamDecorator } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const Profile = createParamDecorator(
      (_: undefined, ctx: ExecutionContext): string | undefined => {
            const request = ctx.switchToHttp().getRequest() as Request;
            const authorization = request.cookies['authorization'];
            const secret = process.env.SALT_KEY;

            if (!secret || !authorization) return undefined;

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
