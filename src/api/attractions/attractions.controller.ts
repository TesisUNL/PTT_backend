import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  Request,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LocalFileFieldsInterceptor, LocalFilesInterceptor } from '../../interceptor/localFiles.interceptors';
import { parseQuery, QueryParamsDto } from '../utils';
import { mapAttractionEntity, mapFilesPath } from './attraction.utils';
import { AttractionsService } from './attractions.service';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto, UpdateImageAttractionDto } from './dto/update-attraction.dto';

@ApiBearerAuth()
@Controller('attractions')
@ApiTags('attractions')
export class AttractionsController {
  constructor(private readonly attractionsService: AttractionsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    LocalFileFieldsInterceptor({
      fieldNames: [
        { name: 'cover_image', maxCount: 1 },
        { name: 'images', maxCount: 10 },
      ],
      fileFilter: (_, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(new BadRequestException('Provide a valid image'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2),
      },
    }),
  )
  create(
    @Body() createAttractionDto: CreateAttractionDto,
    @UploadedFiles() files: { cover_image?: Express.Multer.File[]; images?: Express.Multer.File[] },
  ) {
    if (!createAttractionDto?.cantonName) {
      throw new BadRequestException('The canton is not defined, please provide one');
    }

    createAttractionDto.cover_image = mapFilesPath(files.cover_image)?.[0];
    createAttractionDto.images = mapFilesPath(files.images);

    return this.attractionsService.create(createAttractionDto);
  }

  @Get()
  async findAll(@Request() _req, @Query() queryParamsDto: QueryParamsDto) {
    const query = parseQuery(queryParamsDto);
    const attractions = await this.attractionsService.findAll(query);
    return attractions.map((attraction) => mapAttractionEntity(attraction));
  }

  @Get('byCanton/:cantonName')
  async findAllByCanton(@Param('cantonName') cantonName: string) {
    const attractions = await this.attractionsService.findAllByCanton(cantonName);

    return attractions.map((attraction) => mapAttractionEntity(attraction));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const filters = { id };
    const attraction = await this.attractionsService.findOne({ filters });
    return mapAttractionEntity(attraction);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttractionDto: UpdateAttractionDto) {
    return this.attractionsService.update(id, updateAttractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attractionsService.remove(id);
  }

  @Patch(':id/addImage')
  // swagger documentation
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'images',
      fileFilter: (_, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(new BadRequestException('Provide a valid image'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2),
      },
    }),
  )
  async addImage(
    @Param('id') id: string,
    @Body() updateImageAttractionDto: UpdateImageAttractionDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const filesPath = mapFilesPath(files) || [];
    if (!filesPath.length) {
      throw new BadRequestException('No image provided');
    }
    const filters = { id };
    const attraction = await this.attractionsService.findOne({ filters });
    const images = [...(attraction.images || []), ...filesPath];
    return this.attractionsService.update(id, { images });
  }
}
