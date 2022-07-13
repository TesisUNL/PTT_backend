import { In } from 'typeorm';
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
    return In(filter._in || null);
  }
}

export function parseQuery(queryParamsDto: QueryParamsDto): IQuery {
  const query: IQuery = {};
  const filters = queryParamsDto?.filters && JSON.parse(queryParamsDto.filters.toString());

  if (filters) {
    query['filters'] = Object.keys(filters).reduce((acc, k) => {
      acc[k.replace(/\s/g, '')] = filters[k];
      return acc;
    }, {});

    return query;
  }
}
