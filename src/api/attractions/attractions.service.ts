import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';
import { Attraction } from './entities/attraction.entity';
import { Canton } from '../cantons/entities/canton.entity';
import { IQuery } from '../utils';
import { processAttractionQueries, processAttractionQueriesPagination } from './attraction.utils';
import { FilesService } from '../files/files.service';
import { FileData } from '../files/imterface';

@Injectable()
export class AttractionsService {
  constructor(
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
    @InjectRepository(Canton)
    private readonly cantonRepository: Repository<Canton>,
    private readonly filesService: FilesService,
  ) {}

  async testI(fileBuffer, fileName) {
    const a: FileData = { dataBuffer: fileBuffer, fileName: fileName };
    return this.filesService.uploadPublicFile(a);
  }

  async testID(name) {
    return this.filesService.deletePublicFile(name);
  }

  async create(createAttractionDto: CreateAttractionDto) {
    const { cantonName, ...attractionInfo } = createAttractionDto;

    const canton = await this.cantonRepository.findOne({ name: cantonName });

    if (!canton) {
      throw new NotFoundException(`Not found canton with the name : ${cantonName}`);
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
    const processQuery = processAttractionQueriesPagination(queryParams);
    const query = { ...processQuery, relations: ['canton'] };

    return this.attractionRepository.find({ ...query, order: { created_at: 'DESC' } });
  }

  findAllByCanton(cantonName: string) {
    return this.attractionRepository.find({
      where: { canton: { name: cantonName } },
      relations: ['canton'],
    });
  }

  async findOne(queryParams: IQuery) {
    const query = processAttractionQueries(queryParams);

    return this.attractionRepository.findOne({ ...query, relations: ['canton'] });
  }

  async update(id: string, updateAttractionDto: UpdateAttractionDto) {
    const attraction = await this.attractionRepository.findOne(id);
    if (!attraction) {
      throw new NotFoundException(`attraction with ${id} not found`);
    }

    const updateAttraction = Object.assign(attraction, updateAttractionDto);
    return this.attractionRepository.save(updateAttraction);
  }

  async remove(id: string) {
    const attraction = await this.attractionRepository.findOne(id);
    if (!attraction) {
      throw new NotFoundException(`Attraction with ${id} not found`);
    }

    return this.attractionRepository.remove(attraction);
  }
}
