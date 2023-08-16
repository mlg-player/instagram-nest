import * as Joi from 'joi';

import type { LocationType } from '../location/location.type';
import type { UserType } from '../user/user.type';

export enum MEDIA_TYPES {
    /** (изображение): Медиа-контент, представляющий собой статичное изображение. Обычно это формат JPEG или PNG. */
    IMAGE = 'IMAGE',

    /** (видео): Медиа-контент, представляющий собой видеофайл. В Instagram могут быть загружены видео с продолжительностью до 60 секунд. */
    VIDEO = 'VIDEO',

    /** (карусель): Карусельный пост, который содержит несколько изображений или видео. Пользователи могут пролистывать их горизонтально. */
    CAROUSEL_ALBUM = 'CAROUSEL_ALBUM',

    /** (IGTV): Медиа-контент, предназначенный для размещения в IGTV (Instagram TV). IGTV позволяет загружать более длительные видео, которые могут продолжаться до 60 минут. */
    IGTV = 'IGTV',

    /** (история): Медиа-контент, используемый в историях (Stories). Истории в Instagram доступны в течение 24 часов и обычно представляют собой фотографии или короткие видеозаписи. */
    STORY = 'STORY',

    /** (альбом): Пост с несколькими изображениями или видео, который не является карусельным. В этом случае изображения или видео отображаются вертикально. */
    ALBUM = 'ALBUM',
}

export type PostType = {
    /** Постоянная ссылка на пост. */
    permalink: string;

    /** Текстовое описание к посту. */
    caption: string;

    /** Тип медиа-контента в посте (фотография, видео, карусель и т.д.). */
    media_type: MEDIA_TYPES;

    /** URL медиа-контента (фотографии или видео) в посте. */
    media_url: string;

    /** URL миниатюры медиа-контента (для видео или карусели). */
    thumbnail_url: string;

    /** Временная метка, указывающая на время публикации поста. */
    timestamp: number;

    /** Флаг, указывающий, является ли медиа-контент видео. */
    is_video: boolean;

    /** (объект): Информация о местоположении, где был опубликован пост, включая координаты и другие данные. */
    location: LocationType['id'];

    /** (объект): Информация о пользователе, который опубликовал пост, включая имя пользователя, идентификатор и другие данные. */
    username: UserType['username'];

    full_name: UserType['full_name'];

    profile_picture: UserType['profile_picture'];
};

export const PostSchema = Joi.object<PostType>({
    caption: Joi.string(),
    full_name: Joi.string(),
    is_video: Joi.boolean().required(),
    location: Joi.string().uuid(),
    media_type: Joi.string()
        .valid(
            MEDIA_TYPES.ALBUM,
            MEDIA_TYPES.CAROUSEL_ALBUM,
            MEDIA_TYPES.IGTV,
            MEDIA_TYPES.IMAGE,
            MEDIA_TYPES.STORY,
            MEDIA_TYPES.VIDEO,
        )
        .required(),
    media_url: Joi.string().required(),
    permalink: Joi.string().required(),
    profile_picture: Joi.string(),
});
