import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { parseQuery, QueryParamsDto } from '../utils';
import { mapUser } from './users.utils';

@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() queryParamsDto: QueryParamsDto) {
    const query = parseQuery(queryParamsDto);
    const users = await this.usersService.findAll(query);
    return users.map((user) => mapUser(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const filters = { id };
    const user = await this.usersService.findOne({ filters });
    return mapUser(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
