import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CantonsService } from './cantons.service';
import { CreateCantonDto } from './dto/create-canton.dto';
import { UpdateCantonDto } from './dto/update-canton.dto';

@Controller('cantons')
@ApiTags('cantons')
export class CantonsController {
  constructor(private readonly cantonsService: CantonsService) {}

  @Post()
  create(@Body() createCantonDto: CreateCantonDto) {
    return this.cantonsService.create(createCantonDto);
  }

  @Get()
  findAll() {
    return this.cantonsService.findAll();
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
