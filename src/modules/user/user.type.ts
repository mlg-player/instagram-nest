import * as Joi from 'joi';

export class UserType {
    /** (строка): Имя пользователя или уникальный идентификатор аккаунта. */
    username: string;

    /** (строка | null): Полное имя пользователя. */
    full_name?: string;

    /** (строка): E-mail пользователя. */
    email?: string;

    /** (строка): Пароль пользователя. */
    password?: string;

    /** (строка): Номер телефона пользователя. */
    phone?: string;

    /** (строка | null): Биография или описание пользователя. */
    bio?: string;

    /** (строка | null): Биография или описание пользователя. */
    birthday?: string;

    /** (строка | null): Ссылка на веб-сайт пользователя. */
    website?: string;

    /** (строка | null): URL профильной фотографии пользователя. */
    profile_picture?: string;

    /** (булево значение): Флаг, указывающий, является ли профиль пользователя приватным. */
    is_private: boolean;

    /** (булево значение): Флаг, указывающий, подтвержден ли аккаунт пользователя. */
    is_verified: boolean;
}

export type RegisterDto = {
    email: string;
    full_name: string;
    username: string;
    password: string;
};

export const UserSchema = Joi.object<RegisterDto>({
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            allowUnicode: false,
        })
        .required(),
    full_name: Joi.string().max(20).required(),
});
