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
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { parseQuery, QueryParamsDto } from '../utils';
import { mapAttractionEntity } from './attraction.utils';
import { AttractionsService } from './attractions.service';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto, UploadImageAttractionDto } from './dto/update-attraction.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileImageConfig } from '../files/files.utils';

@ApiBearerAuth()
@Controller('attractions')
@ApiTags('attractions')
export class AttractionsController {
  constructor(private readonly attractionsService: AttractionsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover_image', maxCount: 1 },
        { name: 'images', maxCount: 10 },
      ],
      { fileFilter: fileImageConfig.filter, limits: fileImageConfig.limits },
    ),
  )
  create(
    @Body() createAttractionDto: CreateAttractionDto,
    @UploadedFiles() files: { cover_image?: Express.Multer.File[]; images?: Express.Multer.File[] },
  ) {
    if (!createAttractionDto?.cantonName) {
      throw new BadRequestException('The canton is not defined, please provide one');
    }

    return this.attractionsService.create(createAttractionDto, files);
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('cover_image', { fileFilter: fileImageConfig.filter, limits: fileImageConfig.limits }),
  )
  update(
    @Param('id') id: string,
    @Body() updateAttractionDto: UpdateAttractionDto,
    @UploadedFiles() image?: Express.Multer.File,
  ) {
    return this.attractionsService.update(id, updateAttractionDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attractionsService.remove(id);
  }

  @Patch(':id/addImages')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', 10, { fileFilter: fileImageConfig.filter, limits: fileImageConfig.limits }),
  )
  @ApiBody({ type: UploadImageAttractionDto })
  async addImage(@Param('id') id: string, @UploadedFiles() images: Express.Multer.File[]) {
    if (!images.length) {
      throw new BadRequestException("You don't provide images to add, please provide at least one");
    }

    return this.attractionsService.updateImages(id, images);
  }
}
