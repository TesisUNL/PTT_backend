import { FindManyOptions, FindOneOptions } from 'typeorm';
import { IOperationFilter, IQuery, IQueryTypeOrm, processQuery } from '../utils/utils';
import { Canton } from './entities/canton.entity';

export enum TransformationRelationCantons {
  Attraction = 'attraction',
}

const resolverAttractionRelations: {
  [key in TransformationRelationCantons]?: (query: IQueryTypeOrm<Canton>) => object;
} = {
  [TransformationRelationCantons.Attraction]: (query: IQueryTypeOrm<Canton>) => {
    query.relations.push('tourist_attractions');
    return query;
  },
};

// TODO: Add more filters in case it is necessary
export enum TransformationFilterCantons {
  Id = 'id',
  Name = 'name',
  Province = 'province',
}

export interface IAttractionFilter {
  id: IOperationFilter | string;
  name: IOperationFilter | string;
  province: IOperationFilter | string;
}

export type TQueryOptionsAttractions = FindOneOptions<Canton> | FindManyOptions<Canton>;

const resolverAttractionFilters: {
  [key in TransformationFilterCantons]?: (arg: IAttractionFilter, query: IQueryTypeOrm) => object;
} = {
  [TransformationFilterCantons.Id]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['id'] = processQuery(arg.id);
    return query;
  },
  [TransformationFilterCantons.Name]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['name'] = processQuery(arg.name);
    return query;
  },
  [TransformationFilterCantons.Province]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['province'] = processQuery(arg.province);
    return query;
  },
};

export const processCantonsQueries = (queryParams: IQuery): TQueryOptionsAttractions => {
  const query: TQueryOptionsAttractions = {};
  console.log(queryParams);

  if (queryParams?.filters) {
    const filters = queryParams?.filters;
    query.where = {};

    Object.keys(filters).forEach((k) => {
      resolverAttractionFilters[k](filters, query);
    });
  }

  if (queryParams?.relations) {
    const relations = queryParams?.relations;
    query.relations = [];

    relations.forEach((relationKey) => {
      resolverAttractionRelations[relationKey] && resolverAttractionRelations[relationKey](query);
    });
  }

  return query;
};
