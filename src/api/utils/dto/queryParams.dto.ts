import { TFIlter } from '../utils';

export interface QueryParamsDto {
  filters: string | TFIlter;
  pagination?: { start: number; limit: number } | string;
  relations?: string;
}
