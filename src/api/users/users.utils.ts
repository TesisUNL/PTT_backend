import { FindManyOptions, FindOneOptions } from 'typeorm';
import { IOperationFilter, IQuery, IQueryTypeOrm, processQuery } from '../utils/utils';
import { User } from './entities/user.entity';

// TODO: Add more filters in case it is necessary
export enum TransformationFilterUsers {
  Id = 'id',
  Name = 'name',
  Email = 'email',
}

export interface IAttractionFilter {
  id: IOperationFilter | string;
  name: IOperationFilter | string;
  email: string;
}

export type TQueryOptionsAttractions = FindOneOptions<User> | FindManyOptions<User>;

const resolverAttractionFilters: {
  [key in TransformationFilterUsers]?: (arg: IAttractionFilter, query: IQueryTypeOrm) => object;
} = {
  [TransformationFilterUsers.Id]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['id'] = processQuery(arg.id);
    return query;
  },
  [TransformationFilterUsers.Name]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['name'] = processQuery(arg.name);
    return query;
  },
  [TransformationFilterUsers.Email]: (arg: IAttractionFilter, query: IQueryTypeOrm) => {
    query.where['email'] = processQuery(arg.email);
    return query;
  },
};

export const processUsersQueries = (queryParams: IQuery): TQueryOptionsAttractions => {
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
