import { FindManyOptions, FindOneOptions } from 'typeorm';
import { IOperationFilter, IQuery, IQueryTypeOrm, processQuery } from '../utils/utils';
import { Attraction } from './entities/attraction.entity';

export const mapFilesPath = (files: Express.Multer.File[]) => files?.map((file) => file.path.replace('public/', ''));

export enum TransformationFilterAttraction {
  Id = 'id',
  Name = 'name',
}

export interface IAttractionFilter {
  id: IOperationFilter | string;
  name: IOperationFilter | string;
}

export type TQueryOptionsAttractions = FindOneOptions<Attraction> | FindManyOptions<Attraction>;

const resolverAttractionFilters: {
  [key in TransformationFilterAttraction]?: (arg: IAttractionFilter, query: IQueryTypeOrm) => object;
} = {
  [TransformationFilterAttraction.Id]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['id'] = processQuery(arg.id);
    return query;
  },
  [TransformationFilterAttraction.Name]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['name'] = processQuery(arg.name);
    return query;
  },
};

export const processAttractionQueries = (queryParams: IQuery): TQueryOptionsAttractions => {
  const query: TQueryOptionsAttractions = {};

  if (queryParams?.filters) {
    const filters = queryParams?.filters;
    query.where = {};

    Object.keys(filters).forEach((k) => {
      resolverAttractionFilters[k](filters, query);
    });
  }

  return query;
};

export interface IApiAttractionEntity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  short_description: string;
  long_description: string;
  cover_image: string;
  images: string[];
  canton: string;
}

export function mapAttractionEntity(attractionData: Attraction): IApiAttractionEntity {
  return (
    [
      'id',
      'name',
      'latitude',
      'longitude',
      'short_description',
      'long_description',
      'cover_image',
      'images',
      'created_at',
      'canton',
    ] || []
  ).reduce((acc: IApiAttractionEntity, element: string) => {
    if (element == 'canton' && attractionData?.[element]) {
      acc[element] = attractionData[element]?.name;
      return acc;
    }

    acc[element] = attractionData[element];
    return acc;
  }, {} as IApiAttractionEntity);
}
