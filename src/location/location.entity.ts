import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LocationType } from './location.type';

@Entity()
export class LocationEntity implements LocationType {
  /** (строка): Уникальный идентификатор местоположения. */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** (строка): Название местоположения. */
  @Column()
  name: string;

  /** (число): Широта местоположения. */
  @Column()
  latitude: number;

  /** (число): Долгота местоположения. */
  @Column()
  longitude: number;

  /** (строка): Адрес местоположения или его описание. */
  @Column({
    nullable: false,
  })
  address: string;

  /** (строка): Название города, связанного с местоположением. */
  @Column({
    nullable: false,
  })
  city: string;

  /** (строка): Название страны, связанной с местоположением. */
  @Column({
    nullable: false,
  })
  country: string;
}
