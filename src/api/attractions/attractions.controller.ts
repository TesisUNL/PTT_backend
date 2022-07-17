import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { parseQuery, QueryParamsDto } from '../utils';
import { AttractionsService } from './attractions.service';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';

@Controller('attractions')
@ApiTags('attractions')
export class AttractionsController {
  constructor(private readonly attractionsService: AttractionsService) {}

  @Post()
  create(@Body() createAttractionDto: CreateAttractionDto) {
    if (!createAttractionDto?.cantonId) {
      throw new BadRequestException('The canton id is not defined, please provide one');
    }

    return this.attractionsService.create(createAttractionDto);
  }

  @Get()
  findAll(@Request() req, @Query() queryParamsDto: QueryParamsDto) {
    const query = parseQuery(queryParamsDto);

    return this.attractionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const filters = { id };

    return this.attractionsService.findOne({ filters });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttractionDto: UpdateAttractionDto) {
    return this.attractionsService.update(+id, updateAttractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attractionsService.remove(+id);
  }
}
