import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IQuery } from '../utils';
import { processCantonsQueries } from './cantons.utils';
import { CreateCantonDto } from './dto/create-canton.dto';
import { UpdateCantonDto } from './dto/update-canton.dto';
import { Canton } from './entities/canton.entity';
import { getFileData } from '../files/files.utils';
import { FilesService } from '../files/files.service';

@Injectable()
export class CantonsService {
  constructor(
    @InjectRepository(Canton)
    private readonly cantonRepository: Repository<Canton>,
    private readonly filesService: FilesService,
  ) {}

  async create(createCantonDto: CreateCantonDto, videoFile: Express.Multer.File) {
    if (videoFile && !createCantonDto?.presentation_video) {
      const videoToUpload = getFileData(videoFile);
      const videoUploaded = await this.filesService.uploadPublicFile(videoToUpload);

      createCantonDto.presentation_video = videoUploaded.url;
    }

    const newCanton = this.cantonRepository.create(createCantonDto);
    await this.cantonRepository.save(newCanton);
    // Todo: Control errors of duplicate entry for name
    return newCanton;
  }

  findAll(queryParams: IQuery) {
    const query = processCantonsQueries(queryParams);

    return this.cantonRepository.find(query);
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
