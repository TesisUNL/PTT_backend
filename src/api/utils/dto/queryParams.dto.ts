import { TFIlter } from '../utils';

export interface QueryParamsDto {
  filters: string | TFIlter;
  pagination?: { startIndex: number; stopIndex: number } | string;
  relations?: string;
}
