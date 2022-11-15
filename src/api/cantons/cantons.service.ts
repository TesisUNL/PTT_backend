import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCantonDto } from './dto/create-canton.dto';
import { UpdateCantonDto } from './dto/update-canton.dto';
import { Canton } from './entities/canton.entity';

@Injectable()
export class CantonsService {
  constructor(
    @InjectRepository(Canton)
    private readonly cantonRepository: Repository<Canton>,
  ) {}

  async create(createCantonDto: CreateCantonDto) {
    const newCanton = await this.cantonRepository.create(createCantonDto);
    await this.cantonRepository.save(newCanton);
    return newCanton;
  }

  findAll() {
    return `This action returns all cantons`;
  }

  async findOne(id: string) {
    const canton = await this.cantonRepository.findOne({ id });

    if (!canton) {
      throw new NotFoundException(`Canton with ${id} not exist`);
    }

    return canton;
  }

  update(id: number, updateCantonDto: UpdateCantonDto) {
    return `This action updates a #${id} canton`;
  }

  remove(id: number) {
    return `This action removes a #${id} canton`;
  }
}
