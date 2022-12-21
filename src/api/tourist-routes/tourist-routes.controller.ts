import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UnauthorizedException } from '@nestjs/common';
import { TouristRoutesService } from './tourist-routes.service';
import { CreateTouristRouteDto } from './dto/create-tourist-route.dto';
import { UpdateTouristRouteDto } from './dto/update-tourist-route.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { APP_ROLES } from '../utils';

@ApiBearerAuth()
@Controller('tourist-routes')
@ApiTags('tourist routes')
export class TouristRoutesController {
  constructor(private readonly touristRoutesService: TouristRoutesService) {}

  @Post()
  create(@Request() req, @Body() createTouristRouteDto: CreateTouristRouteDto) {
    const { id, role } = req?.user;
    // Only admins can create tourist routes for other users
    if (role !== APP_ROLES.ADMIN && !createTouristRouteDto.isUserRoute) {
      throw new UnauthorizedException('You are not authorized to create a tourist route for others users');
    }

    return this.touristRoutesService.create(createTouristRouteDto, id);
  }

  @Get()
  async findAll() {
    return this.touristRoutesService.findAll();
  }

  @Get(':ownerId')
  async findAllByCanton(@Param('ownerId') ownerId: string) {
    const routes = await this.touristRoutesService.findAllByOwner(ownerId);

    return routes;
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
