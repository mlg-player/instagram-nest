import { randomBytes, scryptSync } from 'crypto';

import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as Joi from 'joi';
import { sign } from 'jsonwebtoken';
import env_config from 'src/env.config';

import { RegisterDto, UserSchema } from './user.type';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthorizationController {
    constructor(private readonly usersService: UsersService) {}

    expiresAge = () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
    };

    @Post('register')
    async create_user(@Res() response: Response, @Body() body: RegisterDto) {
        const validator = UserSchema.validate(body);

        if (validator.error) {
            throw new HttpException(
                validator.error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        const secretKey = env_config.SALT_KEY;

        if (!secretKey) {
            throw new HttpException(
                'Error! Secret code is not settled',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const { username, email, password, full_name } = body;
        // SALT
        const salt = randomBytes(8).toString('hex');
        const derivedKey = scryptSync(password, salt, 82);
        const hashedSaltPassword = `${derivedKey.toString('hex')}.${salt}`;

        const { password: _, ...user } = await this.usersService.create({
            username,
            email,
            full_name,
            password: hashedSaltPassword,
        });

        const token = sign({ username }, secretKey, {
            expiresIn: 864e5,
        });
        response
            .cookie('token', token, {
                expires: this.expiresAge(),
            })
            .status(HttpStatus.CREATED)
            .send(user);
    }

    @Post('login')
    async login(
        @Res() response: Response,
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        const validator_email = Joi.string()
            .email({
                minDomainSegments: 2,
                allowUnicode: false,
            })
            .validate(username);
        const validator_login = Joi.string()
            .alphanum()
            .min(5)
            .max(30)
            .validate(username);

        if (validator_login.error && validator_email.error) {
            throw new HttpException(
                validator_login.error ?? validator_email.error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        const secretKey = env_config.SALT_KEY;

        if (!secretKey) {
            throw new HttpException(
                'Error! Secret code is not settled',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const founded_user = await this.usersService.find_login_user(
            username,
            validator_login.value ? false : true,
        );
        const auth_error = new HttpException(
            'Wrong "password" or "email`',
            HttpStatus.BAD_REQUEST,
        );
        if (!founded_user) throw auth_error;

        const { password: stored_password, ...user } = founded_user;

        const [hashed, salt] = String(stored_password).split('.');
        const derivedKey = scryptSync(password, salt, 82);

        const isValid = hashed === derivedKey.toString('hex');

        if (!isValid) throw auth_error;

        const token = sign({ username: user.username }, secretKey, {
            expiresIn: 864e5,
        });
        response
            .cookie('token', token, {
                expires: this.expiresAge(),
            })
            .status(HttpStatus.OK)
            .send(user);
    }
}
