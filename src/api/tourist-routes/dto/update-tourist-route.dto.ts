import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristRouteDto } from './create-tourist-route.dto';

export class UpdateTouristRouteDto extends PartialType(CreateTouristRouteDto) {}
