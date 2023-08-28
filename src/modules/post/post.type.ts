import * as Joi from 'joi';

import type { FilesEntity } from '$module/files/files.entity';
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

    media: FilesEntity[];

    /** Временная метка, указывающая на время публикации поста. */
    timestamp: number;

    /** Флаг, указывающий, является ли медиа-контент видео. */
    is_video: boolean;

    /** (объект): Информация о местоположении, где был опубликован пост, включая координаты и другие данные. */
    location: LocationType['id'];

    /** (объект): Информация о пользователе, который опубликовал пост, включая имя пользователя, идентификатор и другие данные. */
    user: UserType;
};

export type PostDto = {
    caption: PostType['caption'];
    location: PostType['location'];
    media: string[];
};

export interface PublicPostType extends PostType {
    full_name: UserType['full_name'];

    profile_picture: UserType['profile_picture'];
}

export const PostDtoSchema = Joi.object<PostDto>({
    caption: Joi.string(),
    location: Joi.string().uuid(),
    media: Joi.array().items(Joi.string().uuid()).required(),
});
