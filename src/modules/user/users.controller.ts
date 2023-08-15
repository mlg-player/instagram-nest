import { Controller, Get, Body, Param, Put, Delete } from '@nestjs/common';

import { UserType } from './user.type';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
      constructor(private readonly usersService: UsersService) {}

      @Get(':username')
      async findOne(@Param('username') username: string): Promise<UserType> {
            return this.usersService.findOne(username);
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
