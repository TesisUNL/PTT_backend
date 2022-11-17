import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { parseQuery, QueryParamsDto } from '../utils';
import { CantonsService } from './cantons.service';
import { CreateCantonDto } from './dto/create-canton.dto';
import { UpdateCantonDto } from './dto/update-canton.dto';

@ApiBearerAuth()
@Controller('cantons')
@ApiTags('cantons')
export class CantonsController {
  constructor(private readonly cantonsService: CantonsService) {}

  @Post()
  create(@Body() createCantonDto: CreateCantonDto) {
    return this.cantonsService.create(createCantonDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    const query = parseQuery(queryParamsDto);
    return this.cantonsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cantonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCantonDto: UpdateCantonDto) {
    return this.cantonsService.update(+id, updateCantonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cantonsService.remove(+id);
  }
}
