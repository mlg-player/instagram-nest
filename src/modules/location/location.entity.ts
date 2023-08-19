import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import type { LocationType } from './location.type';

@Entity()
export class LocationEntity implements LocationType {
    /** (строка): Уникальный идентификатор местоположения. */
    @PrimaryGeneratedColumn('uuid')
    id: LocationType['id'];

    /** (строка): Название местоположения. */
    @Column('text')
    name: LocationType['name'];

    /** (число): Широта местоположения. */
    @Column('integer')
    latitude: LocationType['latitude'];

    /** (число): Долгота местоположения. */
    @Column('integer')
    longitude: LocationType['longitude'];

    /** (строка): Адрес местоположения или его описание. */
    @Column({
        nullable: false,
        type: 'text',
    })
    address: LocationType['address'];

    /** (строка): Название города, связанного с местоположением. */
    @Column({
        nullable: false,
        type: 'text',
    })
    city: LocationType['city'];

    /** (строка): Название страны, связанной с местоположением. */
    @Column({
        nullable: false,
        type: 'text',
    })
    country: LocationType['country'];
}
