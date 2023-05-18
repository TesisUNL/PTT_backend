import { In, Like } from 'typeorm';
import { QueryParamsDto } from '.';

export interface IQueryTypeOrm<Entity = any> {
  where: { [key: string]: string | object | number | boolean };
  relations: (keyof Entity)[];
}
export interface IQuery {
  filters?: TFIlter;
  relations?: Array<string>;
  pagination?: { start: number; limit: number };
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
  const getJson = (object: string | object) => (object && typeof object === 'string' ? JSON.parse(object) : object);
  try {
    const filters = getJson(queryParamsDto?.filters);
    const pagination = getJson(queryParamsDto?.pagination);
    const relations = getJson(queryParamsDto?.relations);
    if (filters) {
      query['filters'] = Object.keys(filters).reduce((acc, k) => {
        acc[k.replace(/\s/g, '')] = filters[k];
        return acc;
      }, {});
    }

    if (relations) {
      query['relations'] = relations.map((key: string) => key.replace(/\s/g, ''));
    }

    if (pagination) {
      query['pagination'] = pagination;
    }
  } catch (error) {
    console.error(error);
  }

  return query;
}

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
