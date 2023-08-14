import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserType } from './user.type';
export type RegisterDto = {
  email: string;
  full_name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserType[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<UserType> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async create(user_dto: RegisterDto): Promise<UserType> {
    const user: UserType = {
      bio: null,
      email: user_dto.email,
      full_name: user_dto.full_name,
      is_private: false,
      is_verified: false,
      password: user_dto.password,
      phone: user_dto.password,
      profile_picture: null,
      username: user_dto.username,
      website: null,
    };
    return this.usersRepository.save(user);
  }

  async update(username: string, user: UserType): Promise<UserType> {
    await this.usersRepository.update(username, user);
    return this.findOne(username);
  }

  async remove(username: string): Promise<void> {
    await this.usersRepository.delete(username);
  }
}
