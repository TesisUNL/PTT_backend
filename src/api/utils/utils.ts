import { In, Like } from 'typeorm';
import { QueryParamsDto } from '.';

export interface IQueryTypeOrm {
  where: { [key: string]: string | object | number | boolean };
}
export interface IQuery {
  filters?: TFIlter;
  relations?: Array<string>;
}

export type TFIlter = {
  [key: string]: string | boolean | number | IOperationFilter;
};

export interface IOperationFilter {
  _in?: Array<string>;
  _like?: string;
  /*_literalIn?: Array<string>;
  min?: number;
  max?: number;
  from?: Date;
  fromExclusive?: Date;
  to?: Date;
  relativeDate?: string;
  not?: string | string[];*/
}

export function processQuery(filter: IOperationFilter | string | number) {
  if (typeof filter === 'string' || typeof filter === 'number') {
    return filter;
  }

  if (filter._in) {
    return In(filter?._in || null);
  }

  if (filter._like) {
    return Like(`%${filter._like}%` || null);
  }
}

export function parseQuery(queryParamsDto: QueryParamsDto): IQuery {
  const query: IQuery = {};
  try {
    const filters = queryParamsDto?.filters && JSON.parse(queryParamsDto.filters.toString());
    if (filters) {
      query['filters'] = Object.keys(filters).reduce((acc, k) => {
        acc[k.replace(/\s/g, '')] = filters[k];
        return acc;
      }, {});
    }
  } catch (error) {
    console.error(error);
  }

  return query;
}
