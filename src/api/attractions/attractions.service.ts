import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';
import { Attraction } from './entities/attraction.entity';
import { Canton } from '../cantons/entities/canton.entity';
import { IQuery } from '../utils';
import { processAttractionQueries } from './attraction.utils';

@Injectable()
export class AttractionsService {
  constructor(
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
    @InjectRepository(Canton)
    private readonly cantonRepository: Repository<Canton>,
  ) {}

  async create(createAttractionDto: CreateAttractionDto) {
    const { cantonId, ...attractionInfo } = createAttractionDto;

    const canton = await this.cantonRepository.findOne({ id: cantonId });

    if (!canton) {
      throw new NotFoundException(`not found canton with the id : ${cantonId}`);
    }

    const attractionToSave = {
      ...attractionInfo,
      canton,
    };

    const newAttraction = await this.attractionRepository.create(attractionToSave);

    await this.attractionRepository.save(newAttraction);

    return newAttraction;
  }

  findAll(queryParams: IQuery) {
    const query = processAttractionQueries(queryParams);

    return this.attractionRepository.find(query);
  }

  async findOne(queryParams: IQuery) {
    const query = processAttractionQueries(queryParams);

    return this.attractionRepository.findOne(query);
  }

  update(id: number, updateAttractionDto: UpdateAttractionDto) {
    return `This action updates a #${id} attraction`;
  }

  remove(id: number) {
    return `This action removes a #${id} attraction`;
  }
}
