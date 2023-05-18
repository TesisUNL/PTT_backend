import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TouristService } from './entities/tourist-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TouristServicesService {
  constructor(
    @InjectRepository(TouristService)
    private readonly touristServiceRepository: Repository<TouristService>,
  ) {}
}
