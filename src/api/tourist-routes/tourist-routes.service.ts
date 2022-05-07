import { Injectable } from '@nestjs/common';
import { CreateTouristRouteDto } from './dto/create-tourist-route.dto';
import { UpdateTouristRouteDto } from './dto/update-tourist-route.dto';

@Injectable()
export class TouristRoutesService {
  create(createTouristRouteDto: CreateTouristRouteDto) {
    return 'This action adds a new touristRoute';
  }

  findAll() {
    return `This action returns all touristRoutes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} touristRoute`;
  }

  update(id: number, updateTouristRouteDto: UpdateTouristRouteDto) {
    return `This action updates a #${id} touristRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} touristRoute`;
  }
}
