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
import { FileData } from '../files/interface';
import { getImageFileData } from '../files/files.utils';

@Injectable()
export class AttractionsService {
  constructor(
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
    @InjectRepository(Canton)
    private readonly cantonRepository: Repository<Canton>,
    private readonly filesService: FilesService,
  ) { }

  async create(
    createAttractionDto: CreateAttractionDto,
    files: { cover_image?: Express.Multer.File[]; images?: Express.Multer.File[] },
  ) {
    if (files.cover_image) {
      const imageToUpload = getImageFileData(files.cover_image[0]);
      const coverImageUploaded = await this.filesService.uploadPublicFile(imageToUpload);

      createAttractionDto.cover_image = coverImageUploaded.url;
    }

    if (files?.images?.length) {
      const imagesFileData: FileData[] = files.images.map(getImageFileData);
      const uploadedImages = await this.filesService.uploadPublicMultipleFile(imagesFileData);
      const imagesUrl = uploadedImages.map((image) => image.url);

      createAttractionDto.images = imagesUrl;
    }

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

  async update(id: string, updateAttractionDto: UpdateAttractionDto, coverImage?: Express.Multer.File) {
    const attraction = await this.attractionRepository.findOne(id);
    if (!attraction) {
      throw new NotFoundException(`attraction with ${id} not found`);
    }

    if (coverImage) {
      const oldCoverImage = attraction.cover_image;
      const newCoverImage = await this.filesService.uploadPublicFile(getImageFileData(coverImage));
      updateAttractionDto.cover_image = newCoverImage.url;
      if (oldCoverImage) {
        await this.filesService.deletePublicFile(oldCoverImage);
      }
    }

    if (updateAttractionDto.images) {
      const imagesToDelete = attraction.images?.filter((imageUrl) => !updateAttraction.images.includes(imageUrl));
      await this.filesService.deletePublicMultipleFiles(imagesToDelete);
    }

    const updateAttraction = Object.assign(attraction, updateAttractionDto);
    return this.attractionRepository.save(updateAttraction);
  }

  async updateImages(id: string, images: Express.Multer.File[]) {
    const filters = { id };
    const attraction = await this.findOne({ filters });
    if (!attraction) {
      throw new NotFoundException(`Attraction with ${id} not found`);
    }

    const imagesFileData: FileData[] = images.map(getImageFileData);

    const uploadedImages = await this.filesService.uploadPublicMultipleFile(imagesFileData);
    const imagesUrls = uploadedImages.map((image) => image.url);
    const imagesUpdated = [].concat(attraction.images).concat(imagesUrls);
    const updateAttraction = Object.assign(attraction, { images: imagesUpdated });

    return this.attractionRepository.save(updateAttraction);
  }

  async remove(id: string) {
    const attraction = await this.attractionRepository.findOne(id);

    if (!attraction) {
      throw new NotFoundException(`Attraction with ${id} not found`);
    }

    const filesToDelete = [].concat(attraction?.images).concat(attraction.cover_image);
    await this.filesService.deletePublicMultipleFiles(filesToDelete);

    return this.attractionRepository.remove(attraction);
  }
}
