import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

import type { RegisterDto, UserType } from './user.type';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async get_access_to_user(author: string, username: string) {
        const found_user = await this.usersRepository.findOne({
            where: { username: author },
        });
        const throw_error = new HttpException('', HttpStatus.BAD_REQUEST);
        if (!found_user) throw throw_error;

        if (found_user.is_private === true) {
            throw throw_error;
        }
    }
    async create(user_dto: RegisterDto): Promise<UserType> {
        const is_existed = await this.usersRepository.findOne({
            where: [{ username: user_dto.username }, { email: user_dto.email }],
        });

        if (is_existed) {
            throw new HttpException(
                'The `username` or `email` already taken!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user: UserType = {
            bio: '',
            email: user_dto.email,
            full_name: user_dto.full_name,
            is_private: false,
            is_verified: false,
            password: user_dto.password,
            phone: '',
            profile_picture: '',
            username: user_dto.username,
            website: '',
        };
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<UserType[]> {
        return this.usersRepository.find();
    }

    async find_login_user(
        username: string,
        is_email: boolean,
    ): Promise<UserType> {
        return this.usersRepository.findOne({
            where: {
                [is_email ? 'email' : 'username']: username,
            },
        });
    }
    async findOne(username: string): Promise<UserType> {
        const found_user = await this.usersRepository.findOne({
            where: { username },
        });
        if (!found_user) {
            throw new HttpException(
                "User doesn't exists",
                HttpStatus.NOT_FOUND,
            );
        }

        const { password, email, phone, ...user } = found_user;
        return user;
    }
    async get_user_profile(username: string): Promise<UserType> {
        const found_user = await this.usersRepository.findOne({
            where: { username },
            select: {
                bio: true,
                full_name: true,
                is_private: true,
                is_verified: true,
                profile_picture: true,
                username: true,
                website: true,
            },
        });

        if (!found_user) {
            throw new HttpException(
                "User doesn't exists",
                HttpStatus.NOT_FOUND,
            );
        }

        return found_user;
    }

    async update(username: string, user: UserType): Promise<UserType> {
        await this.usersRepository.update(username, user);
        return this.findOne(username);
    }

    async remove(username: string): Promise<void> {
        await this.usersRepository.delete(username);
    }
}
