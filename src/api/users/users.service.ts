import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IQuery } from '../utils';
import { processUsersQueries } from './users.utils';
import { In } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  findAll(queryParams: IQuery) {
    const query = processUsersQueries(queryParams);

    return this.usersRepository.find(query);
  }

  async findOne(queryParams: IQuery) {
    const query = processUsersQueries(queryParams);

    return this.usersRepository.findOne(query);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    const updateUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updateUser);
  }

  async bulkUpdate(ids: string[], updateUserDto: UpdateUserDto) {
    if (!ids) {
      throw new BadRequestException(`No users id provided`);
    }

    return this.usersRepository.update(
      {
        id: In(ids),
      },
      updateUserDto,
    );
  }
}
