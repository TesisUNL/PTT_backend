export class CreateTouristRouteDto {
  name: string;
  attractions: string[];
  isUserRoute?: boolean;
  pathLength?: number;
}
