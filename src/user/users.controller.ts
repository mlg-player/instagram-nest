import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterDto, UsersService } from './users.service';
import { UserType } from './user.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private loginValidatorRegex = /[^0-9a-zA-Z-_]+/g;
  private passwordValidatorRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
  private emailValidatorRegex =
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  validLogin(login: string) {
    return this.loginValidatorRegex.test(login);
  }

  @Post()
  async createUser(@Body() body: RegisterDto) {
    const { username, email, password } = body;
    const isLoginOk = !this.loginValidatorRegex.test(username);
    const isEmailOk = this.emailValidatorRegex.test(email);
    const isPasswordOk = this.passwordValidatorRegex.test(password);
    if (!isLoginOk) {
      throw new HttpException('Invalid `login`', HttpStatus.BAD_REQUEST);
    }
    if (!isEmailOk) {
      throw new HttpException('Invalid `email`', HttpStatus.BAD_REQUEST);
    }
    if (!isPasswordOk) {
      throw new HttpException('Invalid `password`', HttpStatus.BAD_REQUEST);
    }
    const createUser = this.usersService.create(body);
    return await createUser;
  }

  @Get()
  async findAll(): Promise<UserType[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<UserType> {
    return this.usersService.findOne(username);
  }

  @Post()
  async create(@Body() user: RegisterDto): Promise<UserType> {
    return this.usersService.create(user);
  }

  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() user: UserType,
  ): Promise<UserType> {
    return this.usersService.update(username, user);
  }

  @Delete(':username')
  async remove(@Param('username') username: string): Promise<void> {
    return this.usersService.remove(username);
  }
}
