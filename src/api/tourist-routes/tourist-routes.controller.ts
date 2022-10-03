import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TouristRoutesService } from './tourist-routes.service';
import { CreateTouristRouteDto } from './dto/create-tourist-route.dto';
import { UpdateTouristRouteDto } from './dto/update-tourist-route.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tourist-routes')
@ApiTags('tourist routes')
export class TouristRoutesController {
  constructor(private readonly touristRoutesService: TouristRoutesService) {}

  @Post()
  create(@Body() createTouristRouteDto: CreateTouristRouteDto) {
    return this.touristRoutesService.create(createTouristRouteDto);
  }

  @Get()
  findAll() {
    return this.touristRoutesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristRoutesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTouristRouteDto: UpdateTouristRouteDto) {
    return this.touristRoutesService.update(+id, updateTouristRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristRoutesService.remove(+id);
  }
}
