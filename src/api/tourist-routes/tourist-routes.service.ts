import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTouristRouteDto } from './dto/create-tourist-route.dto';
import { UpdateTouristRouteDto } from './dto/update-tourist-route.dto';
import { TouristRoute } from './entities/tourist-route.entity';
import { Attraction } from '../attractions/entities/attraction.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TouristRoutesService {
  constructor(
    @InjectRepository(TouristRoute)
    private readonly touristRouteRepository: Repository<TouristRoute>,
    @InjectRepository(Attraction)
    private readonly attractionRepository: Repository<Attraction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTouristRouteDto: CreateTouristRouteDto, userId: string) {
    if (!createTouristRouteDto?.attractions?.length) {
      throw new BadRequestException('The attractions id is not defined, please provide at least one');
    }

    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException('The user does not exist');
    }

    const { attractions: attractionsId, ...attractionRouteInfo } = createTouristRouteDto;

    const filters = { id: In(attractionsId) };
    const attractions = await this.attractionRepository.find({ where: filters });

    if (!attractions?.length) {
      throw new NotFoundException(`Not found attraction with the ids`);
    }

    const attractionRouteToSave = {
      ...attractionRouteInfo,
      owner: user,
      attractions,
    };

    const newTouristRoute = this.touristRouteRepository.create(attractionRouteToSave);
    await this.touristRouteRepository.save(newTouristRoute);

    return newTouristRoute;
  }

  findAll() {
    return this.touristRouteRepository.find({
      where: { isUserRoute: false },
      relations: ['attractions'],
    });
  }

  findAllByOwner(userId: string) {
    return this.touristRouteRepository.find({
      where: { owner: { id: userId } },
      relations: ['attractions', 'owner'],
    });
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
